const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "users" },
  chat: { type: mongoose.Types.ObjectId, ref: "chats" },
  text: String,
});

const Message = mongoose.model("messages", MessageSchema);

module.exports = Message;
