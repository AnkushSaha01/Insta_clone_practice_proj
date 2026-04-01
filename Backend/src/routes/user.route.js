const express = require("express");
const { searchUser } = require("../controllers/user.controller.js");


const router = express.Router()

router.get("/search", searchUser)


module.exports = router;