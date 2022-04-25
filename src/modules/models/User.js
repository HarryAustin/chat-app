const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePicture: { type: String, default: "default" },
});

module.exports = mongoose.model("users", UserSchema);
