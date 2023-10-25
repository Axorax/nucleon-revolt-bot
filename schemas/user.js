const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    immutable: true,
  },
  cash: Number,
  items: [],
});

module.exports = mongoose.model("users", userSchema);
