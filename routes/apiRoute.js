const { getApiEndpoints } = require("../controllers/apiController");
const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/api", getApiEndpoints);

module.exports = apiRouter;
