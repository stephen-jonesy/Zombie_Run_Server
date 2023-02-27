const {
  postRun,
  updateRun,
  getRunsByUser,
  deleteRun,
} = require("../controllers/runController");
const express = require("express");
const runRouter = express.Router();

// runs routes
runRouter.get("/:user_id", getRunsByUser);

runRouter.post("/", postRun);

runRouter.patch("/", updateRun);

runRouter.delete("/:run_id", deleteRun);

module.exports = runRouter;
