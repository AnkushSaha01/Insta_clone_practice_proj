const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const registerController = async (req, res) => {
  const { username, email, fullname, password } = req.body;

  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    username,
    email,
    fullname,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
};

async function login(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid username/email or password",
      success: false,
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isPasswordValid = user.password === hashedPassword;

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid username/email or password",
      success: false,
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
    },
  });
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({
    message: "User profile fetched successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      email: user.email,
      fullname: user.fullname,
    },
  });
}

const googleAuthCallback = (req, res) => {
  // Generate JWT token
  const token = jwt.sign(
    {
      id: req.user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  // Set token in an HTTP-only cookie (adjust domain/secure settings as needed for production)
  res.cookie("token", token);

  // Grab the explicit message set by Passport
  const authMsg = req.user.authMessage || "loggedIn";


  // Redirect to frontend
  res.redirect(`http://localhost:3000/home`);
};

module.exports = { registerController, login, getMe, googleAuthCallback };
