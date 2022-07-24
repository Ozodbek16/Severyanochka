const express = require("express");
const router = express.Router();
const Mongo = require("../model/Mongo");
const User = require("../model/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const products = await Mongo.find();
  res.render("home", {
    title: "Home page",
    products,
  });
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
