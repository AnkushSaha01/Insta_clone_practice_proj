const postModel = require("../models/post.model.js");
const { uploadFile } = require("../service/storage.service.js");


async function createPost(req, res) {

    const author = req.user.id;
    const { caption } = req.body;

    const files = req.files;

    const media = await Promise.all(files.map(async file => {
        const result = await uploadFile({ buffer: file.buffer, fileName: file.originalname })

        return {
            url: result.url,
            media_type: file.mimetype.split("/")[ 0 ]
        }
    }))

    const post = await postModel.create({
        caption,
        author,
        media: media.filter(m => m.media_type === "image" || m.media_type === "video")
    })

    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        post
    })

}

module.exports = { createPost };
