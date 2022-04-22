// modules
require("dotenv").config();
const { registerValidation, loginValidation } = require("../utils/validation");
const ErrorHandler = require("../utils/errorHandler");
const { logger } = require("../utils/logger.js");
const UserService = require("../lib/userService");
const Jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { value, error } = registerValidation.validate(req.body);
    if (error && Object.values(error).length > 0) {
      const registerError = ErrorHandler.validationError(error);
      return res.status(406).json({ errors: registerError });
    }
    const { user } = await UserService.registerUser(value);
    if (user) {
      return res.status(201).json({ user: user, success: true });
    }
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { value, error } = loginValidation.validate(req.body);
    if (error && Object.values(error).length > 0) {
      const loginError = ErrorHandler.validationError(error);
      return res.status(406).json({ errors: loginError });
    }
    const { user, errors } = await UserService.valid(
      value.username,
      value.password
    );
    if (errors) {
      return res.status(400).json({ errors: errors });
    }

    const token = Jwt.sign(user, process.env.SECRET, { expiresIn: "24h" });

    return res.status(200).json({ user: user, token: token });
  } catch (err) {
    logger(err.message);
  }
};

module.exports = { register, login };
