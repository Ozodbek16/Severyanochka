const express = require("express");
const router = express.Router();
const Shopping = require('../model/Shopping')

router.get("/",async (req, res) => {
    const pro = await Shopping.find()
    let sum = 0
    for (let i = 0; i < pro.length; i++) {
        sum += pro[i].card[i].count    
      }
    res.render('catalog.hbs',{
        title: 'Catalog page',
        sum
    })
});

module.exports = router;
