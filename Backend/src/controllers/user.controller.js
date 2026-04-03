const userModel = require("../models/user.model.js");
const followModel = require("../models/follow.model.js");

/**
 * GET /api/users/search?q=abhi
 */

const searchUser = async (req, res) => {
  const { q } = req.query;

  const users = await userModel.aggregate([
    {
      $search: {
        index: "user_search_feature",
        wildcard: {
          query: `*${q}*`,
          path: "username",
          allowAnalyzedField: true,
        },
      },
    },
    {
      $project: {
        username: 1,
        fullname: 1,
        profilePicture: 1,
        score: { $meta: "searchScore" },
      },
    },
  ]);

  res.status(200).json({
    message: "Users fetched successfully",
    users,
  });
};

const followUser = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;
  const isUserExist = await userModel.findById(userId);

  if (!isUserExist) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  if (userId === currentUserId) {
    return res.status(400).json({
      message: "You cannot follow yourself",
      success: false,
    });
  }

  const alreadyFollowing = await followModel.findOne({
    follower: currentUserId,
    followee: userId,
  });

  if (alreadyFollowing) {
    return res.status(400).json({
      message: "You are already following this user",
      success: false,
    });
  }

  const follow = await followModel.create({
    follower: currentUserId,
    followee: userId,
  });

  return res.status(200).json({
    message: "Follow request sent successfully",
    success: true,
    follow,
  });
};

module.exports = { searchUser, followUser };
