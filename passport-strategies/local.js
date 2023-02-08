const passport = require("passport");
const LocalStrategy = require("passport-local");
const { user } = require("../database/models");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user1 = await user.findOne({ where: { email } });
    if (user1) { done(null, user1);}
  } catch {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // Try to find User with matching email in database
      const user1 = await user.findOne(
        { where: { email: email } },
        (err, user1) => {
          if (err) {
            return done(err);
          }
        }
      );

      if (!user1) {
        return done(null, false);
      }

      // If user with this email is found, compare passwords
      const passwordHash = user1.password_hash;
      
      if (!(await bcrypt.compare(password, passwordHash))) { return done(null, false); }

      // If both email and password match, return the User object
      return done(null, user1);
    }
  )
);
