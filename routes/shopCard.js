const express = require("express");
const router = express.Router();
const Cart = require("../model/Shopping");

router.get("/", async (req, res) => {
  const user = res.locals.user;
  const cart = await Cart.findOne({ userid: user._id }).populate([
    "userid",
    "card.product",
  ]);

  console.log(JSON.stringify(cart));

  res.render("shopCard", {
    title: "Korzina",
    cart,
  });
});

router.post("/add", async (req, res) => {
  const { productId, count, color } = req.body;
  const userid = req.cookies.userid;
  const cart = await Cart.findOne({ userid });

  if (!cart) {
    const newCart = new Cart({
      userid,
      products: [{ product: productId, count, color }],
      totalCount: 1,
    });

    try {
      await newCart.save();
    } catch (error) {
      console.log(error);
      res.redirect("/products");
      return;
    }
    res.redirect("/cart");
    return;
  }

  try {
    const totalCount = await Cart.findOne({ userid });
    const updatedCart = await Cart.findOneAndUpdate(
      { userid },
      {
        $push: { products: { product: productId, count, color } },
        $set: { totalCount: totalCount.products.length + 1 },
      }
    );

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
    res.redirect("/products");
  }
});

router.post("/upload", async (req, res) => {
  const updateData = req.body;
  const userid = req.cookies.userid;
  const cart = await Cart.findOne({ userid });

  if (!cart || (!updateData.color && !updateData.count) || !updateData.id) {
    res.redirect("/products");
    return;
  }

  try {
    if (updateData.color) {
      await Cart.findOneAndUpdate(
        { userid, "products._id": updateData.id },
        { $set: { [`products.$.color`]: updateData.color } }
      );
    }
    if (updateData.count) {
      await Cart.findOneAndUpdate(
        { userid, "products._id": updateData.id },
        { $set: { [`products.$.count`]: updateData.count } }
      );
    }
    res.json({ ok: true, message: "Updated cart data" });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, message: "Not updated cart data" });
  }
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
