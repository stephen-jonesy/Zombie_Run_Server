const { getApiEndpoints } = require("../controllers/controllers");
const express = require("express");
const router = express.Router();

router.get("/api", getApiEndpoints)

module.exports = router;