const bcrypt = require("bcrypt");
const passport = require("passport");
const local = require("../passport-strategies/local");
const { user } = require("../database/models");

async function registerUser(req, res, next) {
  try {
    // Parse User information from request body
    const { email, password, first_name, last_name } = req.body;

    // Verify that email address has not already been used by another user
    const emailExists = await user.findOne({ where: { email } });
    if (emailExists) {
      console.log(
        `*** Failed registration: Email address '${email}' already registered ***`
      );
      return res.sendStatus(403);
    }

    // Hash the submitted password
    const password_hash = await bcrypt.hash(password, 10);

    // Add User to database
    const newUser = await user.create({
      email,
      password_hash,
      first_name,
      last_name,
    });
    console.log(
      `*** User '${first_name} ${last_name}' added to the database ***`
    );

    // Pass control to passport.authenticate to begin a session for the new User (send cookie)
    next();
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

async function logIn(req, res) {
  // The authentication for this route is handled by the Passportjs 'Local' Strategy' (../strategies/local.js)
  // If login details are correct, a cookie is returned in the response header to identify the user for future requests
  console.log(
    `*** User '${req.user.first_name} ${req.user.last_name}' logged in successfully ***`
  );
  return res.send(req.user);
}

module.exports = { registerUser, logIn };
