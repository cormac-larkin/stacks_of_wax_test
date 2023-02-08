const express = require("express");
const passport = require("passport");
const cors = require("cors");
const session = require('express-session');
const authRoutes = require("./routes/authRoutes");
const { sequelize } = require("./database/models/index.js");

const store = new session.MemoryStore();

const app = express();
const PORT = 5000;

// Express configuration
app.use(cors({ origin: true, credentials: true })); // Prevent cors issues in development (change in production)

// Configure session cookies
app.use(session({
  secret: "process.env.SESSION_SECRET", // Change!
  cookie: {
      maxAge: ((60000 * 60) * 24) // Sessions will expire after 24h
  },
  saveUninitialized: false,
  resave: false,
  store
}));

app.use(express.urlencoded({ extended: false })); // Allows parsing urlencoded form data
app.use(express.json()); // Allows parsing JSON POST requests

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.json([{ success: true, data: "hello world!" }]);
});

// Routes to use
app.use("/auth", authRoutes);

// Launch server
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`*** Server listening on port ${PORT} ***`);
});
