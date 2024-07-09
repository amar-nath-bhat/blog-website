const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  picture: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  category: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
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
