const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    chatOwner: { type: mongoose.Types.ObjectId, ref: "users" },
    users: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    messages: [{ type: mongoose.Types.ObjectId, ref: "messages" }],
    status: { type: Boolean, default: false },
    notificationSent: { type: Boolean, default: false },
    latestMessage: { type: mongoose.Types.ObjectId, ref: "users" },
  },
  { timeStamps: true }
);

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
