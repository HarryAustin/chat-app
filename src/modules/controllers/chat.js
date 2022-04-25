const User = require("../models/User");
const ChatService = require("../lib/chatService");
const Notification = require("../models/Notification");

const createChat = async (req, res, next) => {
  const chatUser = req.body.id;
  const chatOwner = req.user._id;

  // call service to create or return chat

  const { status } = await ChatService.createChat(chatOwner, chatUser);

  if (!status) {
    //   if false call notification
    await Notification.create();
  }

  return res.status(200).json();
};

module.exports = {
  createChat,
};
