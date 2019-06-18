const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/otherUser/:otherId", async (req, res)=> {
    if (req.params.otherId == req.session.userId) {
        res.json({
            sameUser:true
        });
    } else {
        try {
            let data = await db.getUser(req.params.otherId);
            if (data.rows[0] == undefined) {
                res.json({error: true});
            }
            res.json(data.rows[0]);
        } catch(err) {
            console.log("err app.get(/otherUser/:otherId",err);
        }
    }
});

module.exports = router;
