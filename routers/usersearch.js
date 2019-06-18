const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.post("/users/search/", async (req, res) => {
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

module.exports = router;
