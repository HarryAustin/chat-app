const express = require("express");
const router = express.Router();

// /controller
const { register, login } = require("../modules/controllers/authentication");

// POST
router.post("/register", register);
router.post("/login", login);

module.exports = router;
