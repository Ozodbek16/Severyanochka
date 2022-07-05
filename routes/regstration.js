const express = require("express");
const router = express.Router();
const Shopping = require("../model/Shopping");
const User = require("../model/User");
const bcrypt = require('bcrypt')

router.get("/", async (req, res) => {
  const pro = await Shopping.find();
  let sum = 0;
  pro.forEach((item) => {
    sum = sum + item.count;
  });
  res.render("regstration", {
    title: "regstration page",
    sum,
  });
});

router.post("/",async (req, res) => {
  const {
    phone,
    date,
    region,
    street,
    name,
    surname,
    password,
    gender,
  } = req.body;
  const passwor = await bcrypt.hash(password, 10)
  const userN = new User({
    phone,
    date,
    region,
    street,
    name,
    surname,
    password: passwor,
    gender,
  })

  await userN.save()

  res.redirect('/regstration')
});

module.exports = router;
