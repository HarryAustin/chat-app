require("dotenv").config();
// my modules
const DB = require("./database/DB");
const { app, server } = require("./app.js");
const logger = require("../logger");

DB((err) => {
  if (err) {
    console.log(err);
  } else {
    server;
  }
});
