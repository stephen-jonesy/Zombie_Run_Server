const MongoClient = require("mongodb").MongoClient;
const users = require("../models/user");
const runs = require("../models/run");
const { response } = require("..");

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
    .catch(next);
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
      // console.log("deleted user id", user.user_id);
      res.sendStatus(204);
    })
    .catch(next);
};

exports.getRunsByUser = (req, res, next) => {
  const user = req.params;
  runs
    .find({ user_id: user.user_id })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .send({ message: "Run not found, incorrect user id" });
      }
      res.status(200).send({ result });
    })
    .catch(next);
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
  console.log(req.body);
  runs
    .findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((result) => {
      console.log(result);
      res.status(200).send({ result });
    })
    .catch((err) => {
      console.log(err);
      next(err)
    });
};

exports.deleteRun = (req, res, next) => {
  const run = req.params;
  runs
    .findOneAndDelete({ _id: run.run_id })
    .then(() => {
      // console.log("deleted run id", run.run_id);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
