const express = require("express");
const router = express.Router();

// middlewares
const { protect } = require("../middlewares/authLogin");

const chatController = require("../modules/controllers/chat");

router.get("/users", chatController.searchUsers);
router.get("/list", chatController.listChat);

router.post("/create", chatController.createChatController);
router.post("/single", chatController.findChat);

module.exports = router;
