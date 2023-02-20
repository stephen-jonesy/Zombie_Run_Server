const MongoClient = require("mongodb").MongoClient;
const users = require("./models/user");

exports.findUsers = () => {
  users.find().then((result) => {
    console.log(result);
  });
};

exports.addUser = (req, res, next) => {
  // const obj = {
  //   username: "user5",
  //   email: "user5@stuff.com",
  //   name: "user5",
  //   password: "12345",
  //   profile_image_url: "",
  // };
  users
    .create(req.body)
    .then(() => {
      res.status(201).send({ message: "success" });
    })
    .catch((err) => {
      next(err);
      res.status(400).send({ message: "invalid" });
    });
};

exports.updateUser = (req, res, next) => {
  users
    .findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};
