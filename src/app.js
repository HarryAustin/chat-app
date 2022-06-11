const express = require("express");
const cors = require("cors");

// my func
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const { notificationRoutes } = require("./routes/notification");

// midddlewares
const { protect } = require("./middlewares/authLogin");

// 3rd party
const { logger } = require("./modules/utils/logger");

// app
const app = express();

// PORT
const PORT = process.env.PORT;

const server = app.listen(8000, () => {
  console.log(`server running on port ${PORT}`);
});

const io = require("./sockets/index")(server);

// setup cors
app.use(cors());

// middleware for socket io.
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());

app.use("/auth/v1", authRoutes);
app.use("/chat/v1", protect, chatRoutes);
app.use("/notifications/v1", protect, notificationRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "page does not exist" });
});

app.use((err, req, res, next) => {
  logger(err);
  res.status(500).json({
    message:
      "The Fault is from us, our enigineers are working on it right away",
  });
});

module.exports = { app, server };
