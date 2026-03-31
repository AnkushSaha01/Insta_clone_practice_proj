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
    },
    fullname: {
        type: String,
    },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;