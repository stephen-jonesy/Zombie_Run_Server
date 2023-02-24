const MongoClient = require("mongodb").MongoClient;
const users = require("../models/user");
const runs = require("../models/run");
const { response } = require("..");
const { fetchApiEndpoints } = require("../models/endpoints");

exports.findUsers = () => {
  users.find().then((result) => {
    console.log(result);
  });
};

exports.addUser = (req, res, next) => {
  // if (!req.body.email.length > 0 || !req.body.password.length > 0) {
  //   return res
  //     .status(400)
  //     .send({ data: "Please provide a valid email and password" });
  // }
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
      // console.log("deleted user id", user.user_id);
      res.sendStatus(204);
    })
    .catch(next);
};

exports.getRunsByUser = (req, res, next) => {
  const user = req.params;
  users
    .find({ _id: user.user_id })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .send({ message: "User not found, incorrect user id" });
      }
      runs.find({ user_id: user.user_id }).then((result) => {
        if (result.length === 0) {
          return res.status(200).send({ message: "No runs found" });
        }
        res.status(200).send({ result });
      });
    })
    .catch(next);
};

// runs controllers

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
      res.status(200).send({ result });
    })
    .catch((err) => {
      console.log(err);
      next(err);
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

exports.getApiEndpoints = (request, response, next) => {
  console.log("apiEndpoints");
  fetchApiEndpoints()
    .then((endpoints) => {
      response.status(200).send({ endpoints });
    })
    .catch(next);
};
