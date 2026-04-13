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
          followee: new mongoose.Types.ObjectId(currentUserId),
        },
      },
      {
        $project: {
          follower: "$follower",
          status: "$status",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "follower",
          foreignField: "_id",
          as: "follower",
        },
      },
      { $unwind: { path: "$follower" } },
    ],
    { maxTimeMS: 60000, allowDiskUse: true },
  );

  return res.status(200).json({
    message: "Follow requests fetched successfully",
    success: true,
    follow,
  });
};

const acceptFollowReq = async (req, res) => {
  const { reqId } = req.params;
  const isReqExist = await followModel.findById(reqId);

  if (!isReqExist) {
    return res.status(404).json({
      message: "Request not found",
      success: false,
    });
  }

  const followReq = await followModel.findByIdAndUpdate(reqId, {
    status: "accepted",
  });

  return res.status(200).json({
    message: "Follow request accepted successfully",
    success: true,
    followReq,
  });
};

const rejectFollowReq = async (req, res) => {
  const { reqId } = req.params;
  const isReqExist = await followModel.findById(reqId);

  if (!isReqExist) {
    return res.status(404).json({
      message: "Request not found",
      success: false,
    });
  }

  const followReq = await followModel.findByIdAndDelete(reqId);

  return res.status(200).json({
    message: "Follow request rejected successfully",
    success: true,
    followReq,
  });
};

const getProfileData = async (req, res) => {
  const currentUserId = req.user.id;
  const isUserExist = await userModel.findById(currentUserId);

  if (!isUserExist) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  const profileData = await userModel.aggregate(
    [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(currentUserId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "follows",
          as: "following",
          let: { searchUser: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$follower", "$$searchUser"],
                    },
                    { $eq: ["$status", "accepted"] },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "follows",
          as: "followers",
          let: { searchUser: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$followee", "$$searchUser"],
                    },
                    { $eq: ["$status", "accepted"] },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          username: "$username",
          profilePicture: "$profilePicture",
          fullname: "$fullname",
          posts: "$posts",
          following: "$following",
          followers: "$followers",
        },
      },
    ],
    { maxTimeMS: 60000, allowDiskUse: true },
  );
  

  return res.status(200).json({
    message: "Profile data fetched successfully",
    success: true,
    profileData,
    
  });
};

const getFollowers = async (req, res)=>{
  const currentUserId = req.user.id;
  const isUserExist = await userModel.findById(currentUserId);

  if (!isUserExist) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  const followers = await followModel.find({
    followee: currentUserId,
    status: "accepted",
  }).populate("follower", "username profilePicture fullname");

  return res.status(200).json({
    message: "Followers fetched successfully",
    success: true,
    followers,
  });
}

const getFollowing = async (req, res)=>{
  const currentUserId = req.user.id;
  const isUserExist = await userModel.findById(currentUserId);

  if (!isUserExist) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  const following = await followModel.find({
    follower: currentUserId,
    status: "accepted",
  }).populate("followee", "username profilePicture fullname");

  return res.status(200).json({
    message: "Following fetched successfully",
    success: true,
    following,
  });
}

const getMessages = async (req, res)=>{
  const currentUserId = req.user.id;
  const isUserExist = await userModel.findById(currentUserId);

  if (!isUserExist) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  const messages = await followModel.aggregate(
  [
    {
      $match: {
        $or: [
          { followee: new mongoose.Types.ObjectId(currentUserId) },
          { follower: new mongoose.Types.ObjectId(currentUserId) }
        ],
        status: 'accepted'
      }
    },
    {
      $addFields: {
        user: {
          $cond: {
            if: {
              $eq: ['$follower', new mongoose.Types.ObjectId(currentUserId)]
            },
            then: '$followee',
            else: '$follower'
          }
        }
      }
    },
    { $project: { user: 1 } },
    {
      $group: {
        _id: '$user',
        user: { $first: '$$ROOT' }
      }
    },
    {
      $project: {
        _id: '$user._id',
        user: '$user.user'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: {
        path: '$user',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: '$user._id',
        username: '$user.username',
        profilePicture: '$user.profilePicture'
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);


  return res.status(200).json({
    message: "Messages fetched successfully",
    success: true,
    messages,
  });
}

module.exports = {
  searchUser,
  followUser,
  getFollowReq,
  acceptFollowReq,
  rejectFollowReq,
  getProfileData,
  getFollowers,
  getFollowing,
  getMessages,
};
