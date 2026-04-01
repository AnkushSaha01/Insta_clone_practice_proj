const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    googleId: {
        type: String,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: "https://ik.imagekit.io/bvd7qjtev/man-user-circle-icon.png?updatedAt=1773424691412"
    },
    fullname: {
        type: String,
    },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;