const express = require("express");
const router = express.Router();
const Mongo = require('../model/Mongo')
const Shopping = require('../model/Shopping')

router.get("/", async (req, res) => {
    const pro = await Shopping.find()
    let sum = 0
    pro.forEach(item => {
        sum = sum + item.count
    })
    const products = await Mongo.find()
    res.render('home.hbs', {
        title: 'Home page',
        products,
        sum
    })
});

module.exports = router;
