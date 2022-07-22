const url = 'mongodb+srv://Bobur:2vhYyYBf659w6eCm@cluster0.jnpjw6n.mongodb.net/Product'
// const url = "mongodb://localhost:27017/myapp";
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(url, () => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.log(error);
  }
};
