const express = require("express");
const { updateUser } = require("../controllers");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

router.patch("/", updateUser);

module.exports = router;
