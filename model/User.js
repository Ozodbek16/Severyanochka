const { Schema, model } = require("mongoose");
const moment = require("moment");

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
  cart: {
    items: [
      {
        count: {
          type: Number,
          default: 1,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
  },
  favorites: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
      },
    ],
  },
  orders: {
    items: [
      {
        product: [
          {product: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true,
          },count: {
            type: Number,
            default: 1,
          }}
        ],
        
        time: {
          type: Date,
          required: true
        },
        
        price: {
          type: Number,
          default: 0,
        }
      },
    ],
    
  },
});

module.exports = model("user", userSchema);
