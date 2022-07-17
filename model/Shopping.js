const { Schema, model } = require("mongoose");
const ShoppingScheme = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  totalCount: {
    type: Number,
    default: 0,
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
