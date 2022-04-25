const Chat = require("../models/Chat");

const createChat = async (chatOwner, chatUser) => {
  const chat = await Chat.findOne({
    users: { $all: [chatOwner, chatUser] },
  });

  if (chat === null) {
    const chatOptions = {
      users: [chatOwner, chatUser],
      chatOwner,
    };
    const createChat = await Chat.create(chatOptions);
    return createChat;
  } else {
    return chat;
  }
};

module.exports = {
  createChat,
};
