const express = require("express");
const { searchUser, followUser, getFollowReq, acceptFollowReq } = require("../controllers/user.controller.js");
const authUser = require("../middlewares/auth.middleware.js");
const { validateFollowUser } = require("../validation/user.validator.js");



const router = express.Router()

router.get("/search", authUser, searchUser)
router.post("/follow/:userId", validateFollowUser, authUser, followUser)
router.get("/followReqs", authUser, getFollowReq)
router.patch("/followReq/:reqId", authUser, acceptFollowReq)


module.exports = router;