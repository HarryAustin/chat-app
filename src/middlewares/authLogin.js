require("dotenv").config();
// jwt
const Jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization;
    // verify
    if (token) {
      req.user = await Jwt.verify(token, process.env.SECRET);
      next();
    } else {
      next({ message: "No token provided" });
    }
  } else {
    return res.status(400).json({ message: "Not authorized!" });
  }
};

module.exports = { protect };
