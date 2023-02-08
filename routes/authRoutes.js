const express = require("express");
const passport = require("passport");
const local = require("../passport-strategies/local");
const { registerUser, logIn } = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", registerUser, passport.authenticate("local"), logIn);

module.exports = router;
