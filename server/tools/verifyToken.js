const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const token = req.cookies.myjwt;
  const token = req.headers.authorization.split(" ")[1];
  // console.log(req.cookies);
  // console.log(`mytoken:${token}`);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_SECRET, {
      ignoreExpiration: false,
    });
    req.userId = decoded.sub;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.clearCookie("myjwt");
      return res.status(401).json({ message: "Token Expired" });
    } else {
      return res.status(401).json({ message: "Invalid Token" });
    }
  }
};

module.exports = verifyToken;
