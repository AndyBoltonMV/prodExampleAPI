const userRouter = require("express").Router();
const { User } = require("../models");
const { body } = require("express-validator");
const { login } = require("../controllers");

userRouter.get(
  "/",
  body("username").custom(async (username, { req }) => {
    req.user = await User.findOne({ where: { username } });
    if (!req.user || req.user.password !== req.body.password) {
      throw new Error("Incorrect credentials");
    } else {
      return true;
    }
  }),
  login
);

module.exports = userRouter;
