const Joi = require("joi");

const registerValidation = Joi.object({
  username: Joi.string().required().min(2).max(20).trim().messages({
    "string.min": "username should atleast have 2 characters",
    "string.max": "username should not be more than 20 characters",
    "any.required": "username should atleast contain characters 'A-Z, a-z'",
    "string.empty": "username should atleast contain characters 'A-Z, a-z'",
  }),
  password: Joi.string().min(5).max(30).required().messages({
    "string.min": "password should have atleast 5 characters",
    "string.max": "password should not be more than 30 characters",
    "any.required": "password is required",
    "string.empty": "password is required",
  }),
  confirmPassword: Joi.any().required().valid(Joi.ref("password")).messages({
    "any.only": "passwords do not match",
    "any.required": "please confirm password",
  }),
}).options({ abortEarly: false });

const loginValidation = Joi.object({
  username: Joi.string().required().min(2).max(20).trim().messages({
    "string.min": "username should atleast have 2 characters",
    "string.max": "username should not be more than 20 characters",
    "any.required": "username should atleast contain characters 'A-Z, a-z'",
    "string.empty": "username should atleast contain characters 'A-Z, a-z'",
  }),
  password: Joi.string().min(5).max(30).required().messages({
    "string.min": "password should have atleast 5 characters",
    "string.max": "password should not be more than 30 characters",
    "any.required": "password is required",
    "string.empty": "password is required",
  }),
}).options({ abortEarly: false });

module.exports = { registerValidation, loginValidation };
