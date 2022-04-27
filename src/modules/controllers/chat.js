const User = require("../models/User");
const Chat = require("../models/Chat");
const ChatService = require("../lib/chatService");
const Notification = require("../models/Notification");

const { logger } = require("../utils/logger");

const searchUsers = async (req, res, next) => {
  // search query params
  try {
    const query = req.query.search
      ? {
          username: { $regex: req.query.search, $options: "i" },
        }
      : {}; // either it finds all the users or search that user passed in search
    const users = await User.find(query)
      .find({ _id: { $ne: req.user._id } })
      .select("-password");

    return res.json({ users: users });
  } catch (err) {
    next(err);
  }
};

const createChat = async (req, res, next) => {
  try {
    const chatUser = req.body.user;
    const mainUser = req.user._id;

    // call service to create or return chat

    const result = await ChatService.createChat(mainUser, chatUser);
    const { users, _id, status, messages, notificationSent, chatOwner } =
      await result.populate("users", "-password");

    const otherUser = users.filter((user) => {
      return user._id.equals(chatUser);
    })[0];

    if (!status && !notificationSent) {
      //   if false call notification
      //   notification object, will use websockets or push notifications for this.
      const notificationObj = {
        user: otherUser._id,
        chat: _id,
        message: `${otherUser.username} wants to chat with you, what do you think?`,
      };
      await Notification.create(notificationObj);
      //   update the chat
      await Chat.findByIdAndUpdate({ _id }, { notificationSent: true });
      //   To prevent sending notification twice
    }

    // get other user info.
    return res.status(200).json({
      chat: {
        id: _id,
        name: otherUser.username,
        pic: otherUser.profilePicture,
        messages,
        chatOwner,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createChatController: createChat,
  searchUsers,
};
