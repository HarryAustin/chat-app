const chai = require("chai");
const expect = chai.expect;
const { createResponse } = require("node-mocks-http");
const sinon = require("sinon");

const { createMessage } = require("../../src/modules/controllers/chat");
const ChatService = require("../../src/modules/lib/chatService");

describe("Messages", () => {
  describe("message success", () => {
    it("it should create messages", async () => {
      // make use of chatID, user ID to know user chatting.
      const req = {
        user: {
          _id: "1",
        },
        body: {
          chatID: "3",
          text: "hi there!",
        },
      };
      const res = createResponse();
      const next = () => {
        return;
      };

      const userID = req.user._id;
      const chatID = req.body.chatID;
      //   for now. we just want to create messages. nothing extra

      const messageService = sinon.stub(ChatService, "message").returns({
        id: "5",
        chat: "3",
        sender: "1",
        text: "Hey there!",
      });

      const message = await createMessage(req, res, next);

      expect(messageService.calledOnce).to.be.true;
      expect(messageService.calledWith(userID, chatID, req.body.text)).to.be
        .true;

      expect(message._getJSONData()).to.have.property("message");
    });
  });
});
