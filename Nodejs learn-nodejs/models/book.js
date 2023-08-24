const mongoose = require("mongoose");
const Joi = require("joi");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLenght: 2,
      maxLenght: 70,
    },
    description: {
      type: String,
      default: function () {
        return `About ${this.title}`;
      },
      minLenght: 2,
      maxLenght: 2000,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },

    price: {
      type: Number,
      required: true,
      minLenght: 0.1,
    },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Books", BookSchema);

// joi req new item
function validateNEWbody(obj) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(70).required(),
    description: Joi.string().min(2).max(2000),
    author: Joi.string().min(6).max(40).required(),
    price: Joi.number().min(0.1).required(),
  });
  return ({ error } = schema.validate(obj));
}

// joi req PUT item
function validatePUTbody(obj) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(70),
    description: Joi.string().min(2).max(2000),
    author: Joi.string().min(6).max(40),
    price: Joi.number().min(0.1),
  });
  return ({ error } = schema.validate(obj));
}
module.exports = {
  validateNEWbody,
  validatePUTbody,
  Books,
};
