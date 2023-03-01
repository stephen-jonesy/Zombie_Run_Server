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

exports.updateUser = async (req, res, next) => {
  const updatedUser = req.body;
  if (!updatedUser.password) {
    try {
      const user = await users.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).send({ user });
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const updatedUser = req.body;
      const user = await users.findById({ _id: req.body._id });
      user.password = updatedUser.password;
      await user.save();
      res.status(200).send({ user });
    } catch (error) {
      next(error);
    }
  }
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
