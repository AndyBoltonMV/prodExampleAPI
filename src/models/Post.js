const { db, DataTypes } = require("../db/connection");

const Post = db.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
  },
});

module.exports = Post;
