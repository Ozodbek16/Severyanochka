const express = require("express");
const router = express.Router();

router.get("/",async (req, res) => {
    res.render('regstration.hbs',{
        title: 'regstration page',
    })
});

module.exports = router;
