const express = require("express");
const authUser = require("../middlewares/auth.middleware.js");
const multer = require("multer");
const { createPost,getPosts } = require("../controllers/post.controller.js");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 15 * 1024 * 1024, // 15 MB
    }
})

const router = express.Router();


// POST /api/posts/
router.post("/", authUser, upload.array('media', 7), createPost)
router.get("/",authUser, getPosts)

module.exports = router;