const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/virfyToken");

const { User, validateUserUpdate } = require("../models/Users");

/* only admin and some think user him self  */
/**
 * @desc Get All Users
 * @route /user
 * @method GET
 * @access Public
 * @ONLY_ADMIN
 **/
router.get(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const UsersList = await User.find().select("email username");
    res.status(200).json(UsersList);
  })
);

/**
 * @desc Get Users
 * @route /user/:id
 * @method GET
 * @access Public (only Admin & user himself)
 **/
router.get(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const find = await User.findById(id).select("-password");
    if (find) {
      res.status(200).json(find);
    } else {
      res.status(401).json({ message: "not found the user" });
    }
  })
);

/**
 * @desc delete Users
 * @route /user/:id
 * @method DELETE
 * @access Public (only Admin & user himself)
 **/
router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
   /*  const id = req.params.id; */
    const find = await User.findById(req.params.id).select("-password");
    if (find) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "user has been deleted successfully " });
    } else {
      res.status(401).json({ message: "not found the user" });
    }
  })
);

/* // only admin and some think user him self // */

/**
 * @desc Update User
 * @route /update
 * @method PUT
 * @access Public
 **/
router.put(
  "/update/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const b = req.body;
    validateUserUpdate(b);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const find = await User.findById(req.params.id);
      if (find) {
        if (b.password) {
          var salt = bcrypt.genSaltSync(10);
          b.password = bcrypt.hashSync(b.password, salt);
        }
        const update = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              email: b.email,
              username: b.username,
              password: b.password,
            },
          },
          { new: true }
        ).select("-password");
        res.status(200).json(update);
      } else {
        res.status(400).json({ message: "not found the acount" });
      }
    }
  })
);

/**
 * @desc Delete User
 * @route /delete
 * @method DELETE
 * @access Public
 **/

router.delete(
  "/delete/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const find = await User.findById(id);
    if (find) {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "deleted your acount sucesfly" });
    } else {
      res.status(400).json({ message: "not found the acount" });
    }
  })
);
module.exports = router;
