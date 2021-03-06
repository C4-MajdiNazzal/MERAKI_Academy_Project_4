const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String },
  category: { type: String },
  question: { type: String },
  teacher: { type: mongoose.Types.ObjectId, ref:"User" },
  answers: [{type: mongoose.Types.ObjectId, ref:"answer"}]
});

module.exports = mongoose.model("questions", questionSchema);