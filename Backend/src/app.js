const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const postRouter = require("./routes/post.route.js");
const userRouter = require("./routes/user.route.js");
const storyRouter = require("./routes/story.route.js");
const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Configure Passport
require("./config/passport.js")(passport);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/stories", storyRouter);

module.exports = app;