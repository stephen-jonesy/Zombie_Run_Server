const MongoClient = require("mongodb").MongoClient;
const users = require("./models/user");

exports.findUsers = () => {
  users.find().then((result) => {
    console.log(result);
  });
};

exports.addUser = (req, res, next) => {
  const obj = {
    username: "user5",
    email: "user5@stuff.com",
    name: "user5",
    password: "12345",
    profile_image_url: "",
  };
  users.create(obj).then(() => {
    res.status(201).send({ data: "success" });
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
