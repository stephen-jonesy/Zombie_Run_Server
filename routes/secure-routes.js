const express = require("express");
const {
  updateUser,
  postRun,
  updateRun,
  getRunsByUser,
} = require("../controllers");
const router = express.Router();

//user routes
router.get("/", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

router.patch("/", updateUser);

// runs routes
router.get("/:user_id", getRunsByUser);

router.post("/", postRun);

router.patch("/", updateRun);

module.exports = router;
