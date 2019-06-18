const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.post(`/changeFriendRelation`, async (req, res) => {
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
        console.log("err in app.post(`/addFriendRelation`", err);
        res.json({button: "Send Friend Request"});
    }
});

module.exports = router;
