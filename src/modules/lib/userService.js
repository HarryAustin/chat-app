const User = require("../models/User");
const { logger } = require("../utils/logger");
const bcrypt = require("bcrypt");

const registerUser = async (userObj) => {
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(userObj.password, 10);
    userObj.password = hashedPassword;
    // create
    const user = await User.create(userObj);

    return { user: user };
  } catch (err) {
    logger(err.message);
  }
};

module.exports = { registerUser };
