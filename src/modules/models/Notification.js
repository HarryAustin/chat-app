const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    message: String,
    chat: { type: mongoose.Types.ObjectId, ref: "chat" },
  },
  { timeStamps: true }
);

const Notification = mongoose.model("notification", NotificationSchema);

module.exports = Notification;
