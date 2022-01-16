const express = require("express");

// Import answer controller
const {createNewanswer} = require("../controllers/answer") ;

// Create answer router
const answersRouter = express.Router();

answersRouter.post("/", login);

module.exports = answersRouter;