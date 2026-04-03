const express = require("express");
const { searchUser, followUser } = require("../controllers/user.controller.js");
const authUser = require("../middlewares/auth.middleware.js");
const { validateFollowUser } = require("../validation/user.validator.js");



const router = express.Router()

router.get("/search", searchUser)
router.post("/follow/:userId", validateFollowUser, authUser, followUser)


module.exports = router;