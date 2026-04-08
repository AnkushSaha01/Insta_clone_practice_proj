const mongoose = require("mongoose");
const userModel = require("../models/user.model.js");
const followModel = require("../models/follow.model.js");

/**
 * GET /api/users/search?q=abhi
 */

const searchUser = async (req, res) => {
  const { q } = req.query;

  const users = await userModel.aggregate(
    [
      {
        $search: {
          index: "user_search_feature",
          autocomplete: {
            query: q,
            path: "username",
          },
        },
      },
      {
        $lookup: {
          from: "follows",
          as: "followDoc",
          let: { searchUser: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$followee", "$$searchUser"],
                    },
                    {
                      $eq: [
                        "$follower",
                        new mongoose.Types.ObjectId(req.user.id),
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          followStatus: {
            $cond: {
              if: {
                $lt: [{ $size: "$followDoc" }, 1],
              },
              then: null,
              else: {
                $cond: {
                  if: {
                    $eq: [
                      {
                        $arrayElemAt: ["$followDoc.status", 0],
                      },
                      "pending",
                    ],
                  },
                  then: "requested",
                  else: "following",
                },
              },
            },
          },
        },
      },
      {
        $project: {
          username: "$username",
          fullname: "$fullname",
          profilePicture: "$profilePicture",
          followStatus: "$followStatus",
        },
      },
    ],
    { maxTimeMS: 60000, allowDiskUse: true },
  );

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

const getFollowReq = async (req, res) => {
  const currentUserId = req.user.id;
  const isUserExist = await userModel.findById(currentUserId);

  if (!isUserExist) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  const follow = await followModel.aggregate(
  [
    {
      $match: {
        followee: new mongoose.Types.ObjectId(currentUserId)
      }
    },
    {
      $project: {
        follower: '$follower',
        status: '$status'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'follower',
        foreignField: '_id',
        as: 'follower'
      }
    },
    { $unwind: { path: '$follower' } }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
  

  return res.status(200).json({
    message: "Follow requests fetched successfully",
    success: true,
    follow,
  });
};

module.exports = { searchUser, followUser, getFollowReq };
