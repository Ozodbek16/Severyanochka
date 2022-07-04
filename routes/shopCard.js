const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render('shopCard', {
        title: 'Корзина',
    })
});

module.exports = router;