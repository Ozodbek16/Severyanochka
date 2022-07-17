const express = require("express");
const { localsAsTemplateData } = require("hbs");
const router = express.Router();
const Cart = require("../model/Shopping");

router.get("/", async (req, res) => {
  let cart = {
    card: [],
    totalCount: 0,
  };
  try {
    const user = res.locals.user;
    const newCart = await Cart.findOne({ userid: user._id }).populate([
      "userid",
      "card.product",
    ]);

    newCart ? (cart = newCart) : null;

    let sum = cart.totalCount;

    res.render("shopCard", {
      title: "Korzina",
      cart,
      sum,
    });
  } catch (error) {
    res.render("shopCard", {
      title: "Korzina",
      cart,
      sum: 0,
    });
  }
});

router.post("/add/:id", async (req, res) => {
  const productid = req.params.id;
  const userid = res.locals.user._id;
  const cart = await Cart.findOne({ userid });

  if (!cart) {
    const newCart = new Cart({
      userid,
      card: [{ product: productid, count: 1 }],
      totalCount: 1,
    });

    try {
      await newCart.save();
    } catch (error) {
      console.log(error);
      return;
    }
    res.redirect("/shopping");
    return;
  }

  try {
    await Cart.findOneAndUpdate(
      { userid },
      {
        $push: { card: { product: productid, count: 1 } },
        $set: { totalCount: cart.card.length + 1 },
      }
    );
    console.log("product added to shopping cart: " + userid);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/shopping");
});

router.post("/upload/:id/:count", async (req, res) => {
  const userid = res.locals.user._id;
  const count = +req.params.count;
  const id = req.params.id;
  const cart = JSON.parse(JSON.stringify(await Cart.findOne({ userid })));
  console.log(cart);

  if (!cart || !count || !id || !userid) {
    res.redirect("/shopping");
    return;
  }

  try {
    const updatedData = await Cart.findOneAndUpdate(
      { userid, "card._id": id },
      { $set: { [`card.$.count`]: count } }
    );
    console.log("Product data successfuly updated");
  } catch (error) {
    console.log(error);
  }
  res.redirect("/shopping");
});

router.post("/remove", async (req, res) => {
  const userid = req.locals.user._id;
  const { id } = req.body;

  if (!id || !userid) {
    res.redirect("/shopping");
    return;
  }

  try {
    const totalCount = await Cart.findOne({ userid }).populate("userid");

    await Cart.findOneAndUpdate(
      { userid },
      {
        $pull: { products: { _id: id } },
        totalCount: totalCount.products.length - 1,
      }
    );
    res.send(await Cart.findOne({ userid }).populate("products.product"));
  } catch (error) {
    console.log(error);
    res.json({ ok: true, message: "Product is not removed" });
  }
});

module.exports = router;
