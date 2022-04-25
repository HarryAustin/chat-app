const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    chatName: String,
    users: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    messages: [{ type: mongoose.Types.ObjectId, ref: "messages" }],
    status: { type: Boolean, default: false },
  },
  { timeStamps: true }
);

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
