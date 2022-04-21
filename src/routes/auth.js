const express = require("express");
const router = express.Router();

// /controller
const { register } = require("../modules/controllers/authentication");

// POST
router.post("/register", register);
