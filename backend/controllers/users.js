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
      res.status(201).json({
        success: true,
        message: `Success user Added`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

module.exports = {
    createUser
}