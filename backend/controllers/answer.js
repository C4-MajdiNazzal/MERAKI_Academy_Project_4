const answersModel = require("../database/models/answerSchema");
const questionsModel = require("../database/models/questionSchema");


// This function creates a new answer for a specific question
const createNewanswer = (req, res) => {
  const questionId = req.params.id;
  const { answer } = req.body;
  const newanswer = new answersModel({
    answer,
    //  student,
  });
  newanswer
    .save()
    .then((result) => {
      questionsModel
        .updateOne({ _id: questionId }, { $push: { answers: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `The new answer was added`,
            answer: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

module.exports = {
  createNewanswer,
};
