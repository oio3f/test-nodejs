const mongoose = require("mongoose");
const Joi = require("joi");
const AuthorSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minLenthg: 3,
      maxLenthg: 26,
      unique: true,
    },
    lastname: {
      type: String,
      required: true,
      minLenthg: 3,
      maxLenthg: 26,
    },
    nationality: {
      type: String,
      required: true,
      minLenthg: 3,
      maxLenthg: 26,
    },
    Image: {
      type: String,
      default: "image-avatar.jpg",
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", AuthorSchema);

// validates
function validateAuthorNew(obj) {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(26).required(),
    lastname: Joi.string().min(3).max(26).required(),
    nationality: Joi.string().min(3).max(26).required(),
    image: Joi.string().min(10),
  });
  return ({ error } = schema.validate(obj));
}

function validateAuthorUpdate(obj) {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(26),
    lastname: Joi.string().min(3).max(26),
    nationality: Joi.string().min(3).max(26),
    image: Joi.string().min(10),
  });
  return ({ error } = schema.validate(obj));
}

module.exports = {
  Author,
  validateAuthorNew,
  validateAuthorUpdate,
};
