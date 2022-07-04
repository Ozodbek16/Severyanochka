const express = require("express");
const router = express.Router();
const Shopping = require('../model/Shopping')
router.get("/",async (req, res) => {
  const pro = await Shopping.find()
    let sum = 0
    pro.forEach(item => {
        sum = sum + item.count
    })
  res.render("contact", {
    title: "Contact us",
    sum
  });
});

module.exports = router;
