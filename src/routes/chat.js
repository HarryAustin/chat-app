const express = require("express");
const router = express.Router();

// middlewares
const { protect } = require("../middlewares/authLogin");

const chatController = require("../modules/controllers/chat");

router.get("/users", chatController.searchUsers);

router.post("/create", chatController.createChatController);

module.exports = router;
