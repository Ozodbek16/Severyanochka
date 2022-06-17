const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('home.hbs',{
        title: 'Home page',
    })
});

module.exports = router;
