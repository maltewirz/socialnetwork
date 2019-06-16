const express = require("express");
const router = express.Router();
//technically not needed but for linter:
const db = require("../utils/db");
const bc = require("../utils/bc");



router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let dbEmail = await db.getEmailPassword(email);
        if (dbEmail.rows[0] != undefined) {
            let passwordDb = dbEmail.rows[0].password;
            let authTrue = await bc.checkPassword(password, passwordDb);
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

module.exports = router;
