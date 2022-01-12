const questionModel = require("../database/models/questionSchema");

// This function returns the questions
const getAllQuestions = (req, res) => {
  const userId = req.token.userId;
  questionsModel
    .find({})
    .populate("comments")
    .then((questions) => {
      if (questions.length) {
        res.status(200).json({
          success: true,
          message: `All the questions`,
          userId: userId,
          questions: questions,
          comments: questions.comments,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No questions Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

//This function returns questions by author
const getquestionsByAuthor = (req, res) => {
  let authorName = req.query.author;

  questionsModel
    .find({ author: authorName })
    .then((questions) => {
      if (!questions.length) {
        return res.status(404).json({
          success: false,
          message: `The author: ${authorName} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the questions for the author: ${authorName}`,
        questions: questions,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

// This function returns question by its id
const getquestionById = (req, res) => {
  let id = req.query.id;
  questionsModel
    .findById(id)
    .populate("author", "firstName -_id")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The question not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The question ${id} `,
        question: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

// This function creates new question
const createNewquestion = (req, res) => {
  const { title, description } = req.body;
  const newquestion = new questionsModel({
    title,
    description,
    author: req.token.userId,
  });

  newquestion
    .save()
    .then((question) => {
      res.status(201).json({
        success: true,
        message: `question created`,
        question: question,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

// This function updates question by its id
const updatequestionById = (req, res) => {
  const _id = req.params.id;

  questionsModel
    .findByIdAndUpdate(_id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The question: ${_id} is not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `question updated`,
        question: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

// This function deletes a specific question by its id
const deletequestionById = (req, res) => {
  const id = req.params.id;
  questionsModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The question: ${id} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Succeeded to delete question with id: ${id}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

// This function deletes all the questions for a specific author
const deletequestionsByAuthor = (req, res) => {
  const author = req.body.author;

  questionsModel
    .deleteMany({ author })
    .then((result) => {
      if (!result.deletedCount) {
        return res.status(404).json({
          success: false,
          message: `The Author not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Succeeded to delete questions for the author: ${author}`,
        result,
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
  getAllquestions,
  getquestionsByAuthor,
  getquestionById,
  createNewquestion,
  updatequestionById,
  deletequestionById,
  deletequestionsByAuthor,
};