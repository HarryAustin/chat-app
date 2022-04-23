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
    const returnUser = {
      _id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
    };
    return { user: returnUser };
  } catch (err) {
    logger(err.message);
  }
};

const valid = async (username, password) => {
  // check if user exists
  const user = await User.findOne({ username });
  if (user === null) {
    return {
      errors: { username: "Please enter correct username", password: null },
    };
  }
  // //  compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      errors: { username: null, password: "password is incorrect" },
    };
  }

  if (user && isMatch) {
    return { user: { _id: user._id, username: user.username } };
  }
};

module.exports = { registerUser, valid };
