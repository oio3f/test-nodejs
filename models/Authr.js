const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 10,
    },
    username: {
      type: String,
      required: true,
      minLenght: 4,
      maxLenght: 16,
    },
    password: {
      type: String,
      required: true,
      minLenght: 6,
      maxLenght: 22,
    },
    email: {
      type: String,
      default: "",
      minLenght: 7,
      maxLenght: 22,
    },
    job: {
      type: String,
      minLenght: 3,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* genrateToken; */

AuthorSchema.methods.genrateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      isAdmin: this.isAdmin,
    },
    process.env.SECRET_KEY
  );
};

/* // genrateToken  // */

const Author = mongoose.model("Author", AuthorSchema);

function validateAuthLogin(obj) {
  const schema = Joi.object({
    username: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(6).max(22).required(),
  });
  return ({ error } = schema.validate(obj));
}

function validateAuthRegister(obj) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(16).required(),
    username: Joi.string().min(4).max(16).required(),
    email: Joi.string().min(4).max(30),
    password: Joi.string().min(6).max(22).required(),
    job: Joi.string().min(3).max(16),
  });
  return ({ error } = schema.validate(obj));
}

module.exports = {
  Author,
  validateAuthLogin,
  validateAuthRegister,
};
