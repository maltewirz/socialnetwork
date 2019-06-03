const express = require("express");
const db = require("./utils/db");
const bc = require("./utils/bc");
const csurf = require("csurf");
const app = express();
//compress responses that can be compressed with gzip
const compression = require("compression");
const cookieSession = require("cookie-session");

app.use(compression());
//this enables to server e.g. the logo
app.use(express.static("./public"));
//express.json enables transfering the body object
app.use(express.json());
app.use(
    cookieSession({
        secret: `I'm always haaaapy.`,
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

app.post("/register", function(req, res) {
    let { first, last, email, pass } = req.body;
    if (pass == undefined) {
        res.json({ error: true });
        return;
    }
    bc.hashPassword(pass)
        .then(passHash => {
            db.addUser(first, last, email, passHash)
                .then(resp => {
                    req.session.userId = resp.rows[0].id;
                    res.json({ userId: resp.rows[0].id });
                })
                .catch(err => {
                    console.log("err from db.addUser", err);
                    res.json({ error: true });
                });
        })
        .catch(err => {
            console.log("err from bc.hashPassword", err);
            res.json({ error: true });
        });
});

app.post("/login", function(req, res) {
    let { email, pass } = req.body;
    console.log("req.body", req.body);
    db.getEmailPassword(email)
        .then(dbEmail => {
            if (dbEmail.rows[0] != undefined) {
                let passwordDb = dbEmail.rows[0].password;
                bc.checkPassword(pass, passwordDb)
                    .then(authTrue => {
                        if (authTrue) {
                            req.session.userId = dbEmail.rows[0].id;
                            res.json({ error: false });
                        } else {
                            res.json({ error: true });
                        }
                    })
                    .catch(err => {
                        console.log("err in checkPassword", err);
                    });
            } else {
                res.json({ error: true });
            }
        })
        .catch(err => {
            console.log("err in getEmailPassword", err);
            res.json({ error: true });
        });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening on 8080 and proxy on 8081.");
});
