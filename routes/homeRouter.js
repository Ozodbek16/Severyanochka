const express = require("express");
const router = express.Router();
const Mongo = require("../model/Mongo");
const Shopping = require("../model/Shopping");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const Cart = require("../model/Shopping");
const user = require("../middleware/user");

router.get("/", async (req, res) => {
  const products = await Mongo.find();
  try {
    const user = res.locals.user;
    const cart = await Cart.findOne({ userid: user._id });

    if (!cart) {
      res.render("home", {
        title: "Home page",
        products,
        sum: 0,
      });
      return;
    }

    let sum = cart.totalCount;

    res.render("home", {
      title: "Home page",
      products,
      sum,
    });
  } catch (error) {
    res.render("home", {
      title: "Home page",
      products,
      sum: 0,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body) {
      res.send("Login required");
      // res.redirect('/api/login')
    }

    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      res.send("Username is incorrect");
      return;
    }

    const areSame = await bcrypt.compare(req.body.password, user.password);

    if (!areSame) {
      res.send("Password is incorrect");
      return;
    }

    req.session.userAuth = true;
    req.session.user = user;
    req.session.save((err) => {
      if (err) throw err;
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
