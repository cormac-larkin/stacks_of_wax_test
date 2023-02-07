const express = require("express") ;
const {sequelize} = require("./models/index.js");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.json([
    { success: true, data: "hello world!" },
    { success: true, data: "hello cormac" },
    { success: true, data: "another one" },
    { success: true, data: "last oe" },
  ]);
});

app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`*** Server listening on port ${PORT} ***`);
});
