const { updateUser, deleteUser } = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

//user routes
userRouter.get("/", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

userRouter.patch("/", updateUser);

userRouter.delete("/:user_id", deleteUser);

module.exports = userRouter;
