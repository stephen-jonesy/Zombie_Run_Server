const MongoClient = require("mongodb").MongoClient;
const users = require("./models/user");

exports.findUsers = () => {
  users.find().then((result) => {
    console.log(result);
  });
};

exports.addUser = () => {
  const obj = {
    username: "user2",
    email: "user2@stuff.com",
    name: "user2",
    password: "12345",
    profile_image_url: "",
  };
  users.create(obj).then(() => {
    console.log("created");
  });
};
