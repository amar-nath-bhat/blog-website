const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required"],
  },
});

module.exports = mongoose.model("Token", tokenSchema);
