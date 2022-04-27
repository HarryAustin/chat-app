require("dotenv").config();
// jwt
const Jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      // verify
      if (token) {
        req.user = await Jwt.verify(token, process.env.SECRET);
        next();
      } else {
        return res
          .status(400)
          .json({ message: "Not authorized. Please login " });
      }
    } else {
      return res.status(400).json({ message: "Not authorized. Please login" });
    }
  } catch (err) {
    if (err.message === "jwt expired") {
      return res
        .status(400)
        .json({ message: "Session expired, please login again." });
    } else if (err.message === "invalid token") {
      return res.status(400).json({ message: "Please login again!." });
    } else {
      next(err);
    }
  }
};

module.exports = { protect };
