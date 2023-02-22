exports.duplicateKeyMongooseError = (err, req, res, next) => {
  if (err.code === 11000) {
    res
      .status(400)
      .send({
        message: "Duplicate field. Please enter a unique username/email",
      });
  } else next(err);
};

exports.userValidationFailedError = (err, req, res, next) => {
  if (err._message === "users validation failed") {
    res
      .status(422)
      .send({ message: `${err._message}. Please enter all required fields` });
  } else next(err);
};
