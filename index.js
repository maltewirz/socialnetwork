const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' }); // add homepage herokuapp here later
const db = require("./utils/db");
const csurf = require("csurf");
const compression = require("compression");
const cookieSession = require("cookie-session");
let secrets;
let onlineUsers = {};
let onlineUsersArray =[];
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // secrets.json is in .gitignore
}
const cookieSessionMiddleware = cookieSession({
    secret: secrets.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

////////////////////////// Modules
app.use(compression());
app.use(express.static("./public")); //access to logos etc
app.use(express.json()); // enables req.body
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(csurf());

//Middleware: csrfToken and forbid Header iframe
app.use((req, res, next) => {
    res.cookie("mytoken", req.csrfToken());
    res.setHeader("x-frame-options", "DENY");
    next();
});

//Middleware: redirects for logged in users
function checkLoggedIn(req, res, next) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        next();
    }
}

//Middleware: DEV with proxy PROD w/o
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//MiddlewareGlobal redirect for unregistered users
app.use((req, res, next) => {
    if (
        !req.session.userId &&
        req.url != "/welcome" &&
        req.url != "/register" &&
        req.url != "/login"
    ) {
        res.redirect("/welcome");
    } else {
        next();
    }
});

//////////////////// ROUTES below
app.get("/welcome", checkLoggedIn, function(req, res, next) {
    next();
});

const register = require("./routers/register");
app.use(register);

const login = require("./routers/login");
app.use(login);

const getFriends = require("./routers/getfriends");
app.use(getFriends);

const changeFriendRelation = require("./routers/changefriendrelation");
app.use(changeFriendRelation);

const otherUser = require("./routers/otheruser");
app.use(otherUser);

const userSearch = require("./routers/usersearch");
app.use(userSearch);

const upload = require("./routers/upload");
app.use(upload);


app.get("/user", async (req, res) => {
    try {
        let resp = await db.getUser(req.session.userId);
        res.json(resp.rows[0]);
    } catch(err) {
        console.log("err in db.getUser",err);
    }
});

app.post("/addBio", async (req, res) => {
    try {
        await db.addBio(req.body.bio, req.session.userId);
        res.json({
            success: true
        });
    } catch(err) {
        console.log(`"err in app.post/addBio"`, err);
    }
});

app.get('/users/latest', async (req, res) => {
    try {
        let { rows } = await db.lastUsers();
        res.json(rows);
    } catch(err) {
        console.log("err in app.get('/users/latest'", err);
    }
});

app.get('/friends-wannabes', async (req, res) => {
    try {
        let myId = req.session.userId;
        let resp = await db.getFriendsWannabes(myId);
        res.json(resp.rows);
    } catch(err) {
        console.log("err in app.get('/friends-wannabes'", err);
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080, function() {
    console.log("I'm listening on 8080 and proxy on 8081.");
});

io.on('connection', async socket => {
    const {userId} = socket.request.session;
    if (!userId) {
        return socket.disconnect(true);
    }

    /// onlineUsers collection
    onlineUsers[socket.id] = userId;
    socket.on('disconnect', () => {
        delete onlineUsers[socket.id];
    });

    //adding user to array and emitting globally
    onlineUsersArray = Object.values(onlineUsers);
    let resp = await db.getUsersArray(onlineUsersArray);
    io.sockets.emit("usersOnline", resp.rows);

    //getting historic chat messages on first load
    try {
        let resp = await db.getChatMessages();
        let chatMessages = resp.rows.reverse();

        chatMessages.map(message => {
            message.createdat = message.createdat.toLocaleString();
        });
        io.sockets.emit("chatMessages", chatMessages);
    } catch(err) {
        console.log("err in app.get('/chatMessages'", err);
    }

    socket.on("newCommentComing", async function(data) {
        try {
            let resp = await db.addChatMessage(data.message, userId);
            let messageId = resp.rows[0].id;
            let respPic = await db.getChatMessage(messageId);
            respPic.rows[0].createdat = respPic.rows[0].createdat.toLocaleString();
            io.sockets.emit("chatMessage", respPic.rows);
        } catch(err) {
            console.log(`err in socket.on("newCommentComing"`, err);
        }
    });

});
