const MongoClient = require("mongodb").MongoClient;
const users = require("./models/user");
const runs = require("./models/run");
const { response } = require(".");

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
      console.log(err);
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

exports.getRunsByUser = (req, res, next) => {
  const user = req.params;
  console.log(user);
  runs
    .find({ user })
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postRun = (req, res, next) => {
  runs
    .create(req.body)
    .then((result) => {
      res.status(201).send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateRun = (req, res, next) => {
  runs
    .findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((result) => {
      console.log(result);
      res.status(200).send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};
