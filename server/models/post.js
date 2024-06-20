const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Post", postSchema);
