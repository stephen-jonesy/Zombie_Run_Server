const {
    updateUser,
    deleteUser,
  } = require("../controllers/controllers");
  const express = require("express");
  const router = express.Router();

//user routes
router.get("/", (req, res, next) => {
    res
      .json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token,
      })
  });
  
  router.patch("/", updateUser);
  
  router.delete("/:user_id", deleteUser);

  module.exports = router;