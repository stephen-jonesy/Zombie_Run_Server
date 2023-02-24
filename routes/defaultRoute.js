const { getApiEndpoints } = require("../controllers/controllers");
const express = require("express");
const router = express.Router();

router.get("/", getApiEndpoints)

module.exports = router;