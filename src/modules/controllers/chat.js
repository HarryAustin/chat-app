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
    const { users, _id, status, notificationSent } = await result.populate(
      "users",
      "-password"
    );

    const otherUser = users.filter((user) => {
      return user._id.equals(chatUser);
    })[0];

    const otherUserId = otherUser._id;

    if (!status && !notificationSent) {
      //   if false call notification
      //   notification object, will use websockets or push notifications for this.
      const notificationObj = {
        user: otherUserId,
        chat: _id,
        message: `${req.user.username} wants to chat with you, what do you think?`,
      };
      const notificationMsg = await Notification.create(notificationObj);
      //   update the chat
      //   To prevent sending notification twice
      await Chat.findByIdAndUpdate({ _id }, { notificationSent: true });
      // update user as well
      await User.findByIdAndUpdate(
        { otherUserId },
        { $push: { notifications: notificationMsg._id } }
      );
    }

    // get other user info.
    return res.status(200).json({
      chat: {
        id: _id,
      },
    });
  } catch (err) {
    logger(err);
    next(err);
  }
};

// return single chat
const findChat = async (req, res, next) => {
  const chatUser = req.user._id;
  try {
    const { chatID } = req.body;
    const chatResult = await ChatService.singleChat(chatID);
    if (chatResult === null) {
      return res.status(400).json({ message: "sorry no chat exist" });
    }
    const { users, _id, messages } = chatResult;

    const otherUser = users.filter((user) => {
      return user._id.toString() !== chatUser;
    })[0];

    return res
      .status(200)
      .json({ chat: { id: _id, user: otherUser, messages: messages } });
  } catch (err) {
    logger(err);
    next(err);
    return err;
  }
};

// return all chats
const listChat = async (req, res, next) => {
  try {
    const userID = req.user._id;
    const chats = await ChatService.allChat(userID);

    // return res.json({ chats: chats });
    // for the structure of the frontend requirement.
    const returnChat = [];
    chats.forEach((chat) => {
      const chatObj = {
        id: chat._id,
        image: chat.users[0].profilePicture,
        username: chat.users[0].username,
        message: chat.latestMessage,
        time: chat.time,
      };
      returnChat.push(chatObj);
    });
    return res.json({ chats: returnChat });
    // return res.json({ chats });
  } catch (err) {
    next(err);
    return err;
  }
};

// to create message
const createMessage = async (req, res, next) => {
  try {
    const userID = req.user._id;
    const chatID = req.body.chatID;

    //  call service to create chat
    const message = await ChatService.message(userID, chatID, req.body.text);
    return res.status(200).json({ message: message });
  } catch (err) {
    logger(err);
    next(err);
    return err;
  }
};

const updateChat = async (req, res, next) => {
  try {
    const chatID = req.body.chatID;
    const updateService = await ChatService.updateChat(chatID);
    if (updateService) {
      return res.json({ status: "success", chat: { id: updateService._id } });
    } else {
      return res.json({ status: "failed" });
    }
  } catch (err) {
    logger(err);
    next(err);
    return err;
  }
};

module.exports = {
  createChatController: createChat,
  searchUsers,
  findChat,
  listChat,
  createMessage,
  updateChat,
};
