const bcrypt = require("bcrypt");
const passport = require("passport");
const local = require("../passport-strategies/local");
const { user } = require("../database/models");

async function registerUser(req, res, next) {
  try {
    // Parse User information from request body
    const { email, firstName, lastName, dateOfBirth, joinDate, lastLogin, password } = req.body;

    // Verify that email address has not already been used by another user
    const emailExists = await user.findOne({ where: { email } });
    if (emailExists) {
      console.log(
        `*** Failed registration: Email address '${email}' already registered ***`
      );
      return res.sendStatus(401);
    }

    // Hash the submitted password
    const password_hash = await bcrypt.hash(password, 10);

    // Add User to database
    const newUser = await user.create({
      email,
      password_hash,
      date_of_birth: dateOfBirth,
      first_name: firstName,
      last_name: lastName,
      join_date: joinDate,
      last_login: lastLogin
    });
    console.log(
      `*** User '${firstName} ${lastName}' added to the database ***`
    );

    // Pass control to passport.authenticate to begin a session for the new User (send cookie)
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

async function logIn(req, res) {
  // The authentication for this route is handled by the Passportjs 'Local' Strategy' (../strategies/local.js)
  // If login details are correct, a cookie is returned in the response header to identify the user for future requests

  console.log(
    `*** User '${req.user.first_name} ${req.user.last_name}' logged in successfully ***`
  );

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  return res.send(req.user); 
}

// If the request comes from a client with a currently active session, return their User credentials so they can be set in the React App
// This endpoint will be hit every time the App component first renders, to set the active User
async function authenticate(req,res) {
  if (req.isAuthenticated()) {
    return res.send(req.user);
  }
  return res.status(401).send({message: "No active session for this client"})
 
}

module.exports = { registerUser, logIn, authenticate };
