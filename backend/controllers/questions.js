const questionModel = require("../database/models/questionSchema");

// This function returns the questions
const getAllQuestions = (req, res) => {
  const userId = req.token.userId;
  questionModel
    .find({})
    .populate("question")
    .then((question) => {
      if (question.length) {
        res.status(200).json({
          success: true,
          message: `All the questions`,
          userId: userId,
          question: question,
          // question: question.question ,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No questions Yet`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

//This function returns questions by author
const getQuestionsByAuthor = (req, res) => {
  let authorName = req.query.author;

  questionModel
    .find({ teacher: firstName })
    .then((questions) => {
      if (!questions.length) {
        return res.status(404).json({
          success: false,
          message: `The author: ${firstName} is not found`,
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
const getQuestionById = (req, res) => {
  let id = req.query.id;
  questionModel
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
const createNewQuestion = (req, res) => {
  const { title, category, question, teacher, answers } = req.body;
  const newquestion = new questionModel({
    title,
    category,
    question,
    teacher: req.token.userId,
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
const updateQuestionById = (req, res) => {
  const _id = req.params.id;

  questionModel
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
const deleteQuestionById = (req, res) => {
  const id = req.params.id;
  questionModel
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
const deleteQuestionsByAuthor = (req, res) => {
  const author = req.body.author;

  questionModel
    .deleteMany({ author })
    .then((result) => {
      if (!result.deletedCount) {
        return res.status(404).json({
          success: false,
          message: `The Author is not found`,
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
  getAllQuestions,
  getQuestionsByAuthor,
  getQuestionById,
  createNewQuestion,
  updateQuestionById,
  deleteQuestionById,
  deleteQuestionsByAuthor,
};
