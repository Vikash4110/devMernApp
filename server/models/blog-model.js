const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String, required: true }, // Field for author's name
  createdAt: { type: Date, default: Date.now }, // Field for creation date
});

module.exports = mongoose.model("Blog", blogSchema);
