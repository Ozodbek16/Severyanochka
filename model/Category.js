const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = model("categories", categorySchema);
