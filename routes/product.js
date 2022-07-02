const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload')
const Mongo = require('../model/Mongo')
router.get("/add", (req, res) => {
  res.render("add", {
    title: "add",
  });
});

router.post('/add', upload.single('img'), async (req, res) => {
  const { name, price, discount, star, brand, country, catalog, weight } = req.body
  
  const product = new Mongo({
    name, price, discount, star, brand, country, catalog, weight,
    img: '/img/product-img/'+ req.file.filename
  })
  await product.save()
  res.redirect('/product/add')
})

module.exports = router;