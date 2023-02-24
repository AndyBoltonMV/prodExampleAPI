const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.get("/health", (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
