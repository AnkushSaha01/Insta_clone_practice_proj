const mongoose = require("mongoose");
const chatModel = require("../models/chat.model");
const followModel = require("../models/follow.model");

async function getChats(req, res) {

  console.log(req.params.userId)
  const canChat = await followModel.findOne({
    $or: [
      {
        follower: req.user.id,
        followee: req.params.userId,
        status: "accepted",
      },
      {
        follower: req.params.userId,
        followee: req.user.id,
        status: "accepted",
      },
    ],
  });
  if (!canChat) {
    return res.status(401).json({
      message: "You can not talk to this user",
      success: false,
    });
  }

  const chats = await chatModel
    .find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { receiver: req.user.id, sender: req.params.userId },
      ],
    })

  res.status(200).json({
    success: true,
    message: "Chats fetched successfully",
    chats,
  });
}


module.exports = {getChats}