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
        req.url != "/register"
    ) {
        res.redirect("/welcome");
    } else {
        next();
    }
});

app.post("/register", function(req, res) {
    let { first, last, email, pass } = req.body;
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
        });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening on 8080 and proxy on 8081.");
});
