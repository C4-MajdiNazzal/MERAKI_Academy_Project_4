const express = require("express");

// Import login controller
const { createNewanswer } = require("../controllers/answer") ;

// Create login router
const answersRouter = express.Router();

loginRouter.post("/", createNewanswer);

module.exports = createNewanswer;