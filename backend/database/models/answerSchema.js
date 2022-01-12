const mongoose = require("mongoose") ;

const answerSchema = new mongoose.Schema({
  answer: { type: String } ,
  student: { type: mongoose.Types.ObjectId, ref: "User" } ,
});

module.exports = mongoose.model("Answer", answerSchema);
