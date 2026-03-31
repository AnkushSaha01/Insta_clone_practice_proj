const express = require("express");
const router = express.Router();
const passport = require("passport");
const { registerValidationRules, loginValidationRules } = require("../validation/auth.validator.js");
const { registerController, login, getMe, googleAuthCallback } = require("../controllers/auth.controller.js");
const authUser = require("../middlewares/auth.middleware.js");

router.post("/register", registerValidationRules, registerController);
router.post("/login", loginValidationRules, login);
router.get("/me", authUser, getMe);

// Google OAuth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/register" }), googleAuthCallback);

module.exports = router;