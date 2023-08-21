const mongoose = require("mongoose");
const Joi = require("joi");

const AamatiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 22,
    },
    title: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 16,
    },
    age: {
      type: Number,
      required: true,
      minLenght: 1,
      maxLenght: 101,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    timestamps: true,
  }
);

const Aamati = mongoose.model("Aamati", AamatiSchema);

// joi req new item
function validateNEWbody(obj) {
  const schema = Joi.object({
    name: Joi.string().min(6).max(16).required(),
    title: Joi.string().min(6).max(16).required(),
    age: Joi.number().min(1).max(101).required(),
    author: Joi.string().min(6).max(40).required(),
  });
  return ({ error } = schema.validate(obj));
}

// joi req PUT item
function validatePUTbody(obj) {
  const schema = Joi.object({
    name: Joi.string().min(6).max(16),
    title: Joi.string().min(6).max(16),
    age: Joi.number().min(1).max(101),
  });
  return ({ error } = schema.validate(obj));
}
module.exports = {
  validateNEWbody,
  validatePUTbody,
  Aamati,
};
