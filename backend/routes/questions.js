const express = require("express");

// Import questions controllers
const {
  getAllQuestions,
  getQuestionsByAuthor,
  getQuestionById,
  createNewQuestion,
  updateQuestionById,
  deleteQuestionById,
  deleteQuestionsByAuthor,
} = require("../controllers/questions");

// Import answers controller
const { newanswer } = require("../controllers/answer");

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Create questions router
const questionsRouter = express.Router();



questionsRouter.get("/",authentication, getAllQuestions);
questionsRouter.get("/search_1", getQuestionsByAuthor);
questionsRouter.get("/search_2", getQuestionById);
questionsRouter.post("/",authentication, createNewQuestion);
questionsRouter.put("/:id", updateQuestionById);
questionsRouter.delete("/:id", deleteQuestionById);
questionsRouter.delete("/", deleteQuestionsByAuthor);

questionsRouter.post(
  "/:id/comments",
  authentication,
  authorization("CREATE_COMMENTS"),
  createNewComment
);

module.exports = questionsRouter;