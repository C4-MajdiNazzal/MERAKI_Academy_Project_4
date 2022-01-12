const userModel = require("../database/models/userSchema");
const createUser = (req, res) => {
  const { firstName, lastName, email, password, question, role } = req.body;
  const user = new userModel({
    firstName,
    lastName,
    email,
    password,
    question,
    role,
  });

  user
    .save()
    .then((result) => {
      let sucessMessage = {
        success: "true",
        message: "Success Author Added",
        author: result,
      };
      res.status(200);
      res.json(sucessMessage);
    })
    .catch((err) => {
      let errorMessage = {
        success: "false",
        message: "The email already exists",
      };
      res.status(409);
      res.json(errorMessage);
    });
};

module.exports = {
    createUser
}