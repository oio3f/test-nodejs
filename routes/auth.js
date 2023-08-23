const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const {
  User,
  validateUserLogin,
  validateUserRegister,
} = require("../models/Users");

/**
 * @desc Register User
 * @route /register
 * @method POST
 * @access Public
 **/
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    validateUserRegister(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const b = req.body;
      const find = await User.findOne({ email: b.email });
      if (find) {
        res.status(400).json({ message: `this email alredy used` });
      } else {
        var salt = bcrypt.genSaltSync(10);
        b.password = bcrypt.hashSync(b.password, salt);
        const account = await new User({
          email: b.email,
          username: b.username,
          password: b.password,
        });
        const result = await account.save();
        const token = await account.generateToken(); // Use account, not Acount
        const { password, _id, ...other } = result._doc;
        res.status(201).json({ _id, ...other, token });
      }
    }
  })
);

/**
 * @desc Login User
 * @route /login
 * @method POST
 * @access Public
 **/
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    validateUserLogin(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const b = req.body;

      const user = await User.findOne({
        email: b.email,
      });

      if (user) {
        const verification = bcrypt.compareSync(b.password, user.password);

        if (verification) {
          const token = user.generateToken();
          const { password, _id, ...other } = user._doc;
          const responseObj = { _id, /* ...other, */ token };
          res.status(200).json(responseObj);
        } else {
          res.status(401).json({ message: "invalid email or password" });
        }
      } else {
        res.status(401).json({ message: "invalid email or password" });
      }
    }
  })
);

module.exports = router;
