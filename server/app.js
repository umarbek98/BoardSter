const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const dbConnect = require("./dbConnect");
const { User } = require("./userModel");
const express = require("express");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const jwt = require("jsonwebtoken");
const verifyToken = require("./tools/verifyToken");
const cookieParser = require("cookie-parser");
const Stripe = require("stripe")(process.env.REACT_APP_SECRET_KEY);
const cors = require("cors");
dbConnect();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const host = "http://localhost";
const port = 5000;

passport.use(new LocalStrategy(User.authenticate()));
app.use(cookieParser());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    await User.register(new User({ email }), password);
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(`user:${JSON.stringify(user, null, 2)}`);
    const authenticated = await user.authenticate(password);
    console.log(`authenticated: 
    ${authenticated}`);
    if (!user || !authenticated.user || null || undefined) {
      const err = new Error();
      next(err);
    } else {
      const token = await jwt.sign(
        { sub: user._id },
        process.env.REACT_APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      console.log(`token: ${token}`);
      res.json({
        status: 200,
        token,
        httpOnly: true,
        sameSite: true,
        message: "user logged in",
        user,
      });
    }
  } catch (err) {
    next(err);
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("myjwt");
  res.status(200).json({ message: "User logged out successfully." });
});

app.post("/pay", async (req, res) => {
  const result = await Stripe.charges.create({
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  });

  res.json({ result });
});

app.post("/orders", async (req, res) => {
  const { products, userId } = req.body;

  const user = await User.findByIdAndUpdate(userId, {
    $push: { orders: products },
  });
  res.json({ success: true, user });
});

app.get("/orders/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const orders = user.orders;
    res.status(200).json({ orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${host}:${port}`);
});

// const http = require("http");
// const httpServer = http.createServer(app);
// httpServer.listen(3000, () => {
//   console.log(`HTTP server is listening on ${host}:5000`);
// });
