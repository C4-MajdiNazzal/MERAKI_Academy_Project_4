const jwt = require("jsonwebtoken");

// This function checks if the user logged in 
const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        success: false,
        message: `Forbidden not authorized`,
      });
    }
    const token = req.headers.authorization.split(" ").pop();

    jwt.verify(token, process.env.SECRET, (err, result) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: `The Token is invalid or expired`,
        });
      } else {
        req.token = result;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
    });
  }
};

module.exports = authentication;