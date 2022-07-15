const { Schema, model } = require("mongoose");
const ShoppingScheme = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  card: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],
});
module.exports = model("shoppings", ShoppingScheme);
