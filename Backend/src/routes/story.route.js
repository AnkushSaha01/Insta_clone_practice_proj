const express = require("express");
const authUser = require("../middlewares/auth.middleware.js");
const multer = require("multer");
const { createStory, getStories } = require("../controllers/story.controller.js");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 15 * 1024 * 1024, // 15 MB
    }
})

const router = express.Router();

router.post("/", authUser, upload.array('media', 7), createStory)
router.get("/get-stories", authUser, getStories)

module.exports = router;