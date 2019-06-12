const express = require("express");
const app = express();
const db = require("./utils/db");
const bc = require("./utils/bc");
const csurf = require("csurf");
const compression = require("compression");
const cookieSession = require("cookie-session");
const { cookieSecret } = require("./secrets/cookieSecret");
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
////////////////////////// Modules
app.use(compression());
app.use(express.static("./public")); //access to logos etc
app.use(express.json()); // enables req.body
app.use(
    cookieSession({
        secret: cookieSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
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


app.post("/register", async (req, res) => {
    try {
        let { first, last, email, pass } = req.body;
        if (pass == undefined) {
            res.json({ error: true });
            return;
        }
        let passHash = await bc.hashPassword(pass);
        let resp = await db.addUser(first, last, email, passHash);
        req.session.userId = resp.rows[0].id;
        res.json({ error: false });
    } catch(err) {
        console.log("err from post /register", err);
        res.json({ error: true });
    }
});


app.post("/login", async (req, res) => {
    try {
        let { email, pass } = req.body;
        let dbEmail = await db.getEmailPassword(email);
        if (dbEmail.rows[0] != undefined) {
            let passwordDb = dbEmail.rows[0].password;
            let authTrue = await bc.checkPassword(pass, passwordDb);
            if (authTrue) {
                req.session.userId = dbEmail.rows[0].id;
                res.json({ error: false });
            } 
        } else {
            res.json({ error: true });
        }
    } catch(err) {
        console.log("err in post /login", err);
        res.json({ error: true });
    }
});

app.get("/user", async (req, res) => {
    try {
        let resp = await db.getUser(req.session.userId);
        res.json(resp.rows[0]);
    } catch(err) {
        console.log("err in db.getUser",err);
    }
});

app.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    let url = `https://s3.amazonaws.com/spiced-bucket/${req.file.filename}`;
    if (req.file) {
        try {
            await db.addImage(url, req.session.userId);
            res.json({
                url: url || './avatar.png'
            });
        } catch(err) {
            console.log("err in post /upload",err);
        }
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

app.get("/otherUser/:otherId", async (req, res)=> {
    if (req.params.otherId == req.session.userId) {
        res.json({
            sameUser:true
        });
    } else {
        try {
            let data = await db.getUser(req.params.otherId);
            res.json(data.rows[0]);
        } catch(err) {
            console.log("err in post /upload",err);
        }
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

app.post("/users/search/", async (req, res) => {
    let currentQuery = req.body.currentQuery;
    if (currentQuery == "") {
        res.redirect('/users/latest');
    } else {
        try {
            let { rows } = await db.searchUsers(currentQuery);
            if (rows.length == 0) {
                res.json({error:true});
            } else {
                res.json(rows);
            }
        } catch(err) {
            console.log(`err in app.post("/users/search/"`, err);
        }
    }
});

app.get('/getFriends/:otherId', async (req, res) => {
    let myId = req.session.userId;
    let otherId = req.params.otherId;
    try {
        let { rows } = await db.getUserRelation(myId, otherId);
        let resp = rows[0];
        if (resp.accepted) {
            res.json({button: "Unfriend"});
        } else if (resp.sender_id == myId && resp.receiver_id == otherId) {
            res.json({button: "Cancel Friend Request"});
        } else if (resp.sender_id == otherId && resp.receiver_id == myId) {
            res.json({button: "Accept Friend Request"});
        } else if (resp.accepted == false) {
            res.json({button: "Send Friend Request"});
        }
    } catch(err) {
        console.log("err in app.get('/getFriends/:otherId'", err);
    }
});

app.post(`/changeFriendRelation`, async (req, res) => {
    let myId = req.session.userId;
    let otherId = req.body.otherId;
    let butPressed = req.body.buttonMsg;
    try {
        if (butPressed == "Unfriend" || butPressed == "Cancel Friend Request") {
            await db.deleteUserRelation(myId, otherId);
            res.json({button: "Send Friend Request"});
        }
        if (butPressed == "Accept Friend Request") {
            await db.acceptUserRelation(myId, otherId);
            res.json({button: "Unfriend"});
        }
        if (butPressed == "Send Friend Request") {
            await db.sendUserRelation(myId, otherId);
            res.json({button: "Cancel Friend Request"});
        }
    } catch(err) {
        console.log("app.post(`/addFriendRelation`", err);
        res.json({button: "Send Friend Request"});
    }
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening on 8080 and proxy on 8081.");
});
