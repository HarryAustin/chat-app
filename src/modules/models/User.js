const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePicture: { type: String, default: "defaultPicture" },
  notifications: [{ type: mongoose.Types.ObjectId, ref: "notifications" }],
});

module.exports = mongoose.model("users", UserSchema);
