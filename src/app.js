const express = require("express");

// my func
const authController = require("./modules/controllers/authentication");

// app
const app = express();

app.use("/auth/v1", authController);

app.use((req, res, next) => {
  res.status(404).json({ message: "page does not exist" });
});

app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        "The Fault is from us, our enigineers are working on it right away",
    });
});

module.exports = app;
