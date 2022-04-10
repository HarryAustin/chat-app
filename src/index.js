require("dotenv").config();
// my modules
const DB = require("./database/DB");
const app = require("./app.js");
const logger = require("../logger");

// setup log and logger

const PORT = process.env.PORT;
DB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(8000, () => {
      console.log(`server running on port ${PORT}`);
    });
  }
});
