const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('card.hbs',{
        title: 'Card',
    })
});

module.exports = router;
