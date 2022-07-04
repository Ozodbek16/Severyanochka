const express = require("express");
const router = express.Router();
const Favorites = require('../model/Favorites')
const Mongo = require('../model/Mongo')

router.get("/", async (req, res) => {
  const product = await Favorites.find()
  res.render("favorites", {
    title: "Favorites page",
    product
  });
});

router.post('/:id', async (req, res) => {
  const product = await Mongo.findById(req.params.id)
  const {
    name,
    price,
    discount,
    star,
    brand,
    country,
    catalog,
    weight,
    img
  } = product

  const favorit = await Favorites.find({
    name,
    price,
    discount,
    star,
    brand,
    country,
    catalog,
    weight,
    img
  })
  if(favorit[0] === product[0]){
    const fav = new Favorites({
      name,
  price,
  discount,
  star,
  brand,
  country,
  catalog,
  weight,
  img,
  count: 1
    })
    await fav.save()
  }else{
    
    favorit[0].count = favorit[0].count + 1
    
    await Favorites.findByIdAndUpdate(favorit[0]._id, favorit[0])
  }
  
  res.redirect('/favorites')
})

module.exports = router;
