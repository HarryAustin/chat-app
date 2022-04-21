// modules
const { registerValidation } = require("../utils/validation");
const ErrorHandler = require("../utils/errorHandler");
const { logger } = require("../utils/logger.js");
const UserService = require("../lib/userService");

const register = async (req, res, next) => {
  try {
    const { value, error } = registerValidation.validate(req.body);
    if (Object.values(error).length > 0) {
      const registerError = ErrorHandler.validationError(error);
      return res.status(406).json({ errors: registerError });
    }
    const { user } = await UserService.registerUser(value);
    if (user) {
      return res.status(200).json({ user: user, success: true });
    }
  } catch (err) {
    logger(err);
    next(err);
  }
};

module.exports = { register };
