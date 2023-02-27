const runs = require("../models/run");
const users = require("../models/user");

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
      .catch((err) => {
        next(err)
      });
  };
  
  exports.postRun = (req, res, next) => {
    const body = { ...req.body, created_at: new Date(Date.now()) };
    runs
      .create(body)
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
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  };
