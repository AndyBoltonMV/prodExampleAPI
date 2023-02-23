require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const { join } = require("path");
const storage = process.env.STORAGE || join(__dirname, "db.sqlite");

const db = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false,
});

module.exports = {
  db,
  DataTypes,
};
