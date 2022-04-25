const express = require("express");

// my func
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

// 3rd party
const { logger } = require("./modules/utils/logger");

// app
const app = express();

app.use(express.json());

app.use("/auth/v1", authRoutes);
app.use("/chat/v1", chatRoutes);

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

module.exports = app;
