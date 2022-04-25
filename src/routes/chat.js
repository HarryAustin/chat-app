const express = require("express");
const router = express.Router();

// middlewares
const { protect } = require("../middlewares/authLogin");

const chatController = require("../modules/controllers/chat");

router.post("/create", protect, chatController.createChat);

module.exports = router;
