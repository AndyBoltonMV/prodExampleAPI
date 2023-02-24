const { validationResult } = require("express-validator");

exports.login = async (req, res) => {
  try {
    if (!validationResult(req).isEmpty()) {
      throw new Error("Not logged in");
    } else {
      res.status(200).send({ user: req.user });
    }
  } catch (error) {
    res.status(500).send({ err: error });
  }
};
