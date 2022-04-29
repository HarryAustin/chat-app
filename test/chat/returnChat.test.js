const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const { createResponse } = require("node-mocks-http");

// controllers
const { findChat, listChat } = require("../../src/modules/controllers/chat");

// service
const ChatService = require("../../src/modules/lib/chatService");

describe("To return chats", () => {
  describe("For single chat", () => {
    it("it should return single chat with request of chat id", async () => {
      const req = {
        body: {
          chatID: "3",
        },
      };
      const res = createResponse();
      const next = () => {
        return;
      };

      //   call chat service
      const chatService = sinon.stub(ChatService, "singleChat").returns({
        chat: {
          id: "3",
          chatOwner: "user 2",
          users: ["1", "2"],
          messages: [],
          latestMessage: "4",
        },
      });

      const chat = await findChat(req, res, next);

      expect(chatService.calledOnce).to.be.true;
      expect(chatService.calledWith(req.body.chatID));

      expect(chat._getJSONData()).to.have.property("chat");
      expect(chat._getJSONData().chat).to.have.property("id");
      expect(chat._getJSONData().chat.user).to.have.property("profilePicture");

      sinon.restore();
      sinon.verifyAndRestore();
    });
  });

  describe("for all chats paginated tho", () => {
    it("it returns all chat and success too", async () => {
      const req = {};
      const res = createResponse();
      const next = () => {
        return;
      };

      //   call chat service
      const chatService = sinon.stub(ChatService, "allChat").returns([
        {
          chat: {
            id: "3",
            chatOwner: "user 2",
            users: ["1", "2"],
            messages: [],
            latestMessage: "4",
          },
        },
      ]);

      const chat = await listChat(req, res, next);

      expect(chatService.calledOnce).to.be.true;

      expect(chat._getJSONData()).to.be.an("array");

      sinon.restore();
      sinon.verifyAndRestore();
    });
  });
});
