const storyModel = require("../models/story.model");
const { uploadFile } = require("../service/storage.service.js");

const createStory = async (req, res) => {
  try {
    const author = req.user.id;
    const files = req.files;

    const media = await Promise.all(
      files.map(async (file) => {
        const result = await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });

        return {
          url: result.url,
          media_type: file.mimetype.split("/")[0],
        };
      }),
    );
    const story = await storyModel.create({
      author,
      media: media.filter(
        (m) => m.media_type === "image" || m.media_type === "video",
      ),
    });
    res.status(201).json({ success: true, story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStories = async (req, res) => {
  try {
    const stories = await storyModel.find().populate("author", "username profilePicture");
    res.status(200).json({ success: true, stories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createStory, getStories };
