const { Schema, mongoose } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  password: String,
  profilePicture: { type: String, default: "default" },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
