const express = require("express");
const router = express.Router();
const Mongo = require('../model/Mongo')

router.get("/", async (req, res) => {
    const products = await Mongo.find()
    res.render('home.hbs', {
        title: 'Home page',
        products,
    })
});

module.exports = router;
