const AppError = require("../utils/applicationError");

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details,
    });
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).send({
      type: "SequelizeUniqueConstraintError",
      details: error.errors[0].message,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
    });
  }

  return res
    .status(500)
    .send("Something went really wrong!!\nPlease contact for support");
};

module.exports = errorHandler;
