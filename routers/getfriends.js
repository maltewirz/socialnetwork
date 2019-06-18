const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get('/getFriends/:otherId', async (req, res) => {
    let myId = req.session.userId;
    let otherId = req.params.otherId;

    try {
        let { rows } = await db.getUserRelation(myId, otherId);
        let resp = rows[0];
        if (resp == undefined) {
            return null;
        }
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

module.exports = router;
