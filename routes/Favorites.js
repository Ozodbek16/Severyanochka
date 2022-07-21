const express = require("express");
const router = express.Router();
const Favorites = require('../model/Favorites')
const Products = require('../model/Mongo')
const Users = require("../model/User");

router.get("/", async (req, res) => {
  const user = res.locals.user
  const pro = await Users.findById(user._id).populate("favorites.items.product")
  res.render("favorites", {
    title: "Favorites page",
    product: pro.favorites.items,
  });
});

router.post('/:id', async (req, res) => {
  const user = res.locals.user

  const isProductYes = user.favorites.items.find((item) => item.product._id == req.params.id);
  if(isProductYes){
    res.redirect('/favorites')
    return;
  }
  
  try {
    await Users.findOneAndUpdate(
      { _id: user._id},
      {
        $push: { "favorites.items": { product: req.params.id } },
      }
    );
    res.redirect('/favorites')
    } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/delete/:id',async (req, res) => {  
  try {
    const userUpdate = await Users.findOneAndUpdate(
      { _id: res.locals.user._id},
      {
        $pull:{
          'favorites.items': {product: req.params.id}
        }
      }
    );
    res.redirect('/favorites')
    } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router;
