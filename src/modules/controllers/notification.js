// We will fetch all the notifications

// since im not doing much, no need for service.

const Notification = require("../models/Notification");

const allNotifications = async (req, res, next) => {
  const user = req.user._id;
  console.log("user", user);
  const list = await Notification.find({ user: user }); //remember to sort with dates
  return res.json({ notifications: list });
};

module.exports = { allNotifications };
