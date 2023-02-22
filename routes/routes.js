const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { addUser } = require("../controllers/controllers");

const router = express.Router();

router.post("/signup", addUser);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (!user) {
        const error = new Error("An error occurred.");
        console.log("in error");
        return res.status(401).send({ data: "incorrect password or email" });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
