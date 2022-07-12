const express = require("express");
const router = express.Router();
const Shopping = require('../model/Shopping')
const Mongo = require('../model/Mongo')

router.get("/", async (req, res) => {
    const pro = await Shopping.find()
    let sum = 0
    pro.forEach(item => {
        sum = sum + item.count
    })
    res.render('shopCard', {
        title: 'Корзина',
        pro,
        sum
    })
});

router.post('/:id', async (req, res) => {
    const prd = await Mongo.findById(req.params.id)

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
      } = prd

    const shop = await Shopping.find({
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
  if(shop[0] === prd[0]){
    const fav = new Shopping({
      name,
  price,
  discount,
  star,
  brand,
  country,
  catalog,
  weight,
  img,
  count: 1,
  AllPrice: 1 * price
    })
    await fav.save()
  }else{
    
    shop[0].count = shop[0].count + 1
    shop[0].AllPrice = shop[0].count * shop[0].price
    
    await Shopping.findByIdAndUpdate(shop[0]._id, shop[0])
  }
    res.redirect('/shopping')
})

router.post('/card/plus/:id',async (req, res) => {
  const prd = await Shopping.findById(req.params.id)
  let sum = prd.count + 1
  const cr = {
    count: sum,
    AllPrice: sum * prd.price
  }
  await Shopping.findByIdAndUpdate(req.params.id,cr)
  res.redirect('/shopping')
})

router.post('/card/minus/:id',async (req, res) => {
  const prd = await Shopping.findById(req.params.id)
  let sum = prd.count - 1
  const cr = {
    count: sum,
    AllPrice: sum * prd.price
  }
  if(cr.count === -1){
    cr.count = 0
    cr.AllPrice = 0
  }
  await Shopping.findByIdAndUpdate(req.params.id,cr)
  res.redirect('/shopping')
})

module.exports = router;