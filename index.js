const express = require("express");

const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const {
  findCustomers,
  addCustomers,
  findUsers,
  addUser,
} = require("./controllers");
const passport = require("passport");
const bodyParser = require("body-parser");

const UserModel = require("./models/user");

dotenv.config({ path: "./config/config.env" });
if (!process.env.NODE_ENV) {
  connectDB();
}

require("./auth/auth");

const routes = require("./routes/routes");
const secureRoute = require("./routes/secure-routes");

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

app.use("/runs", passport.authenticate("jwt", { session: false }), secureRoute);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

if (!process.env.NODE_ENV) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, console.log(`Server running on ${PORT}`));
}

module.exports = app;
