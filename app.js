import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.json({ success: true, data: "hello world!" });
});

app.listen(PORT, () => {
  console.log(`*** Server listening on port ${PORT} ***`);
});
