const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const s3 = require("../utils/s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/../uploads");
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

router.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    let { rows } = await db.getUser(req.session.userId);
    if (rows[0].pic_url != null) {
        s3.deletePic(rows[0].pic_url);
    }
    let url = `https://s3.amazonaws.com/spiced-bucket/${req.file.filename}`;
    if (req.file) {
        try {
            await db.addImage(url, req.session.userId);
            res.json({
                url: url || '../public/avatar.png'
            });
        } catch(err) {
            console.log("err in post /upload",err);
        }
    }
});

module.exports = router;
