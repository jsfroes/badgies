const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    images: [{ type: mongoose.Types.ObjectId, ref: "badges.files" }],
  })
);

module.exports = User;
