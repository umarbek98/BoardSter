const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");
// const { applyMiddleware } = require("@reduxjs/toolkit");
// const { default: userEvent } = require("@testing-library/user-event");
const dbConnect = require("./dbConnect");
const { User } = require("./userModel");
const express = require("express");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const jwt = require("jsonwebtoken");
const verifyToken = require("./tools/verifyToken");
const cookieParser = require("cookie-parser");
dbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const host = "http://localhost";
const port = 5000;

passport.use(new LocalStrategy(User.authenticate()));
app.use(cookieParser());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(password);

  try {
    await User.register(new User({ username }), password);
    res.status(200).json({ sucess: "posted" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unautherized" });
  }
});

app.get("/check", verifyToken, async (req, res, next) => {
  const userId = req.userId;
  console.log("MYCUSTOMER: " + userId);
  try {
    const user = await User.findById(userId);
    console.log(user);
    res.status(200).json({ message: "User is logged in.", userId });
  } catch (err) {
    console.error("didnt work");
    next(err);
  }
});

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const authenticated = await user.authenticate(password);
    console.log(authenticated);
    console.log(authenticated);
    if (!user || !authenticated.user) {
      err.message(authenticated.error);
      next(err);
    } else {
      console.log("User logged in successfully");
      const token = jwt.sign({ sub: user._id }, process.env.REACT_APP_SECRET, {
        expiresIn: "1m",
      });
      res.cookie("myjwt", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ message: "User logged in successfully.", user });
    }
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${host}:${port}`);
});
