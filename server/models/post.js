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
  archived: {
    type: Boolean,
    default: false,
  },
});

postSchema.index({
  title: "text",
  description: "text",
  category: "text",
  username: "text",
});

module.exports = mongoose.model("Post", postSchema);
