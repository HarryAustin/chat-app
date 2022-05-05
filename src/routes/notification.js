const express = require("express");
const router = express.Router();

const notification = require("../modules/controllers/notification");

const { protect } = require("../middlewares/authLogin");

router.get("/notifications", notification.allNotifications);

module.exports = { notificationRoutes: router };
