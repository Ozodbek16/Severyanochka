const express = require("express");
const router = express.Router();

router.get("/",async (req, res) => {
    
    res.render('catalog.hbs',{
        title: 'Catalog page',
    })
});

module.exports = router;
