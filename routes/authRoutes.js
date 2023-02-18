const express = require("express");
const passport = require("passport");
const local = require("../passport-strategies/local");
const { registerUser, logIn, authenticate } = require("../controllers/authControllers");
const { ensureAuthenticated } = require("../passport-strategies/ensureAuthenticated");

const router = express.Router();

router.post("/register", registerUser, passport.authenticate("local"), logIn);
router.post("/login", passport.authenticate("local"), logIn);
router.get("/authenticate", authenticate);

module.exports = router;
