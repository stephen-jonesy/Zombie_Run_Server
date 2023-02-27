const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { addUser } = require("../controllers/userController");

const authRouter = express.Router();

authRouter.post("/signup", addUser);

authRouter.post("/login", async (req, res, next) => {
  if (!req.body.email.length > 0 || !req.body.password.length > 0) {
    return res
      .status(400)
      .send({ data: "Please provide a valid email and password" });
  }
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (!user) {
        const error = new Error("An error occurred.");
        console.log("in error");
        return res.status(401).send({ data: "incorrect password or email" });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = {
          _id: user._id,
          email: user.email,
          username: user.username,
          name: user.name,
          image: user.profile_image_url,
        };
        const token = jwt.sign({ user: body }, "TOP_SECRET");
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = authRouter;
