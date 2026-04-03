const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending",
    },
},{
  timestamps: true,
});

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel;