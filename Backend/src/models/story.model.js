const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    media: [ {
        url: {
            type: String,
        },
        media_type: {
            type: String,
            enum: [ "image", "video" ]
        }
    } ],
    
    
}, { timestamps: true })

const storyModel = mongoose.model("story", storySchema);

module.exports = storyModel;
