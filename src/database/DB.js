require("dotenv").config();
const mongoose = require("mongoose");

const DB = async (cb) => {
  let DBName;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (process.env.NODE_ENV === "development") {
    DBName = process.env.MONGODB;
  } else if (process.env.NODE_ENV === "testing") {
    DBName = process.env.MONGODB_TEST;
  } else {
    DBName = process.env.MONGODB_PROD;
  }

  try {
    const connection = await mongoose.connect(DBName, options);
    cb();
    console.log(`Database running on ${connection.host} on ${DBName}`);
  } catch (err) {
    if (err.message.includes("connect ECONNREFUSED")) {
      cb("Activate the mongo server, or check the Database uri");
    }
  }
};

module.exports = DB;
