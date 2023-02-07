import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.json([
    { success: true, data: "hello world!" },
    { success: true, data: "hello cormac" },
    { success: true, data: "another one" },
    { success: true, data: "last one" },
  ]);
});

app.listen(PORT, () => {
  console.log(`*** Server listening on port ${PORT} ***`);
});
