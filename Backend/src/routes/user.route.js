const express = require("express");
const { searchUser, followUser, getFollowReq, acceptFollowReq, rejectFollowReq, getProfileData, getFollowers, getFollowing } = require("../controllers/user.controller.js");
const authUser = require("../middlewares/auth.middleware.js");
const { validateFollowUser } = require("../validation/user.validator.js");



const router = express.Router()

router.get("/search", authUser, searchUser)
router.post("/follow/:userId", validateFollowUser, authUser, followUser)
router.get("/followReqs", authUser, getFollowReq)
router.patch("/followReq/:reqId", authUser, acceptFollowReq)
router.delete("/followReq/:reqId", authUser, rejectFollowReq)
router.get("/profile", authUser, getProfileData)
router.get("/followers", authUser, getFollowers)
router.get("/following", authUser, getFollowing)


module.exports = router;