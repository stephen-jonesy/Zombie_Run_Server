const express = require("express");

const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { findCustomers, addCustomers } = require("./controllers");
const passport = require("passport");
const bodyParser = require("body-parser");

const UserModel = require("./models/user");

dotenv.config({ path: "./config/config.env" });
connectDB();

require("./auth/auth");

const routes = require("./routes/routes");
const secureRoute = require("./routes/secure-routes");

const app = express();
app.use(express.json());
findCustomers();
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on ${PORT}`));
