const MongoClient = require("mongodb").MongoClient;
const users = require("../models/user");

exports.findUsers = () => {
  users.find().then((result) => {
    console.log(result);
  });
};

exports.addUser = (req, res, next) => {
  users
    .create(req.body)
    .then(() => {
      res.status(201).send({ message: "success" });
    })
    .catch((err) => {
      // console.log(err);
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  users
    .findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch(next);
};

exports.deleteUser = (req, res, next) => {
  const user = req.params;
  users
    .findOneAndDelete({ _id: user.user_id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};