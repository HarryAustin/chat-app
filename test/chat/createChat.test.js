const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const { createRequest, createResponse } = require("node-mocks-http");

// controller
const { createChatController } = require("../../src/modules/controllers/chat");

// models
const Notification = require("../../src/modules/models/Notification");

// services
const ChatService = require("../../src/modules/lib/chatService");

describe("Chat Conversation", () => {
  describe("Chat error", () => {});

  describe("Chat success", () => {
    beforeEach(() => {
      sinon.verifyAndRestore();
      sinon.restore();
    });

    after(() => {
      sinon.verifyAndRestore();
      sinon.restore();
    });

    it("it should create a new chat conversation", async () => {
      const req = {
        body: {
          user: "2", //this represents second user for the chat. I prefer using post request
        },
        user: {
          _id: "1", //this implies user is logged in
        },
      };
      const res = createResponse();
      const next = () => {
        return;
      };
      //  so logic is we, get the ids, then use a service to create the conversation for users.
      // when the conversation is created, we send a notification to user 2.
      // and our conversation must be created by user 1 sending message to user 2, hence the frontend will send the request to the API when user also sends a message
      // and when user 2 clicks on the notification, he/she accepts or declines conversation.
      // if accepted, conversation to user's conversation and it appears on user screen
      // also if chat is already created, user after a while can decide to create a chat that is alreay created.

      const chatUser = req.body.user;
      const chatOwner = req.user._id;

      //   service to create conversation
      const createService = sinon.stub(ChatService, "createChat").returns({
        user: [
          {
            _id: "2",
            username: "user 2",
            profilePicture: "default",
          },
          {
            _id: "1",
            username: "user 1",
            profilePicture: "default",
          },
        ],
        chat: {
          _id: "3",
          chatName: "user 2",
        },
        status: false, //This means both users havent agreed to the chat yet.
        messages: [{ message: "hey there!", time: "23452637263" }], //this means untill a user chats with the other, till then we create the chat.
        // Messages must be paginated!!!
        notificationSent: false,
      });
      // create chat service will check if a chat had exist before, if it had exist, it'll return the chat
      // and the data above is when a new chat is created.

      //   notification to user 2
      const notificationUser = sinon.stub(Notification, "create").returns({
        _id: "4",
        message: "user 1 has sent a request to chat with you",
        chat: "3", //for the user to make a link to
        user: "1", //something to refer to user, populate for user information
      });

      const chat = await createChatController(req, res, next);

      expect(createService.calledWith(chatOwner, chatUser)).to.be.true;
      expect(createService.calledOnce).to.be.true;
    });

    it("it should return the chat instead of creating the chat", async () => {
      const req = {
        body: {
          user: "2",
        },
        user: {
          _id: "1",
        },
      };
      const res = createResponse();
      const next = () => {
        return;
      };

      const chatUser = req.body.user;
      const chatOwner = req.user._id;

      // here, chat exists, so it should be returning information of the chat and not creating it.
      const createService = sinon.stub(ChatService, "createChat").returns({
        user: {
          _id: "2",
          username: "user 2",
          profilePicture: "default",
        },
        chat: {
          _id: "4",
          chatName: "user 2",
        },
        messages: [
          {
            message: "message",
            time: "233555263625",
          },
        ],
        // Messages must be paginated!!!
        status: false, //since the status is true, a notification will not be sent
      });

      const notificationUser = sinon.spy(Notification, "create");

      const chat = await createChatController(req, res, next);

      expect(createService.calledOnce).to.be.true;
      expect(createService.calledWith(chatOwner, chatUser)).to.be.true;

      expect(notificationUser.called).to.be.false;
    });
  });
});
