const mongoose = require("mongoose");
const Joi = require("joi");
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minLenthg: 4,
      maxLenthg: 26,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      minLenthg: 4,
      maxLenthg: 26,
    },
    password: {
      type: String,
      required: true,
      minLenthg: 6,
      maxLenthg: 30,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

// validates
function validateUserRegister(obj) {
  const schema = Joi.object({
    email: Joi.string().min(4).max(26).required().email(),
    username: Joi.string().min(4).max(26).required(),
    password: Joi.string().min(6).required(),
  });
  return ({ error } = schema.validate(obj));
}

function validateUserLogin(obj) {
  const schema = Joi.object({
    email: Joi.string().min(4).max(26).required(),
    password: Joi.string().min(6).required(),
  });
  return ({ error } = schema.validate(obj));
}

function validateUserUpdate(obj) {
  const schema = Joi.object({
    email: Joi.string().min(4).max(26).email(),
    username: Joi.string().min(4).max(26),
    password: Joi.string().min(6),
  });
  return ({ error } = schema.validate(obj));
}
module.exports = {
  User,
  validateUserRegister,
  validateUserLogin,
  validateUserUpdate,
};
