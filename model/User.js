const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  phone: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

module.exports = model("user", userSchema);
