const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

// models
const Chat = require("../../src/modules/models/Chat");
const User = require("../../src/modules/models/User");

// service
const { createChatService } = require("../../src/modules/lib/chatService");

describe("Create Chat Service", () => {
  describe("chat service errors", () => {});

  describe("chat service success (create or return the chat)", () => {
    /**Logic
     *1) we take both Ids, if a chat had exist, we return the chat.
     *2) If the chat does not exist, we create the chat with a status of false by default ( to know if other accepts chat and for notification)
     */

    beforeEach(() => {
      sinon.verifyAndRestore();
      sinon.restore();
    });

    after(() => {
      sinon.verifyAndRestore();
      sinon.restore();
    });

    it("it should find the chat", async () => {
      const chatOwner = "1";
      const chatUser = "2";

      // we will find a chat with these 2 Ids
      // query "db.fakeCollection.find({ elements: {$all: ['a', 'd']}})"
      const createChat = sinon.stub(Chat, "findOne").returns({
        user: [
          {
            _id: "1",
            username: "user 1",
            profilePicture: "default",
            // ....
          }, //user 1
          {
            _id: "2",
            username: "user 2",
            profilePicture: "default",
          }, //user 2
        ],
        chatName: "user 2",
        messages: [
          {
            message: "hi there !",
          }, //message from user 1 used to create chat
        ],
        status: true,
      });

      const createService = await createChatService(chatOwner, chatUser);

      expect(createChat.calledOnce).to.be.true;

      expect(createService).to.have.property("user");
      expect(createService).to.have.property("status");
    });

    it("it should create the chat, if finding chat returned null", async () => {
      const chatOwner = "1";
      const chatUser = "2";

      const findChat = sinon.stub(Chat, "findOne").returns(null);
      // returns null, so create the chat

      const createChat = sinon.stub(Chat, "create").returns({
        user: [
          {
            _id: "1",
            username: "user 1",
            profilePicture: "default",
            // ....
          }, //user 1
          {
            _id: "2",
            username: "user 2",
            profilePicture: "default",
          }, //user 2
        ],
        chatName: "user 2",
        messages: [
          {
            message: "hi there !",
          }, //message from user 1 used to create chat
        ],
        status: false,
      });

      const createService = await createChatService(chatOwner, chatUser);

      expect(findChat.calledOnce).to.be.true;

      expect(createService).to.have.property("user");
      expect(createService).to.have.property("status");
    });
  });
});
