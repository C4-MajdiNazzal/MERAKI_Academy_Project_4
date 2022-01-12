const answersModel = require("../db/models/answers");
const questionsModel = require("../db/models/questions");

// This function creates a new answer for a specific question
const createNewanswer = (req, res) => {
  const questionId = req.params.id;
  const { answer } = req.body;
  const newanswer = new answersModel({
    answer,
    answerer: req.token.userId,
  });
  newanswer
    .save()
    .then((result) => {
      questionsModel
        .updateOne({ _id: questionId }, { $push: { answers: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `The new answer added`,
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
