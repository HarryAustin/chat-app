// We will fetch all the notifications

// since im not doing much, no need for service.

const Notification = require("../models/Notification");

const allNotifications = async (req, res, next) => {
  const user = req.user._id;
  const list = await Notification.find({ user: user }).sort({
    createdAt: "desc",
  }); //remember to sort with dates
  return res.json({ notifications: list });
};

module.exports = { allNotifications };
