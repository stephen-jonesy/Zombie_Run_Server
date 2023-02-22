const express = require("express");
const {
  updateUser,
  postRun,
  updateRun,
  getRunsByUser,
  deleteRun,
  deleteUser,
} = require("../controllers/controllers");
const router = express.Router();

//user routes
router.get("/", (req, res, next) => {
  res
    .json({
      message: "You made it to the secure route",
      user: req.user,
      token: req.query.secret_token,
    })
    .catch(next);
});

router.patch("/", updateUser);

router.delete("/:user_id", deleteUser);

// runs routes
router.get("/:user_id", getRunsByUser);

router.post("/", postRun);

router.patch("/", updateRun);

router.delete("/run/:run_id", deleteRun);

module.exports = router;
