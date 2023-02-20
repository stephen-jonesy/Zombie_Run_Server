const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const users = require("./models/user");

exports.findCustomers = () => {
  users.find().then((result) => {
    console.log(result);
  });
};

// exports.addCustomers = () => {
//   const obj = {
//     username: "xdmeme",
//     name: "memexd",
//     address: "9286 Bethany Glens\nVasqueztown, CO 22939",
//     birthdate: Date(),
//     email: "arroyocolton@gmail.com",
//     active: true,
//     accounts: [371138, 324287, 276528, 332179, 422649, 387979],
//     tier_and_details: {
//       "0df078f33aa74a2e9696e0520c1a828a": {
//         tier: "Bronze",
//         id: "0df078f33aa74a2e9696e0520c1a828a",
//         active: true,
//         benefits: [Array],
//       },
//       "699456451cc24f028d2aa99d7534c219": {
//         tier: "Bronze",
//         benefits: [Array],
//         active: true,
//         id: "699456451cc24f028d2aa99d7534c219",
//       },
//     },
//   };
//   model.create(obj).then(() => {
//     console.log("created");
//   });
// };
