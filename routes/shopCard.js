const express = require("express");
const router = express.Router();
const Cart = require("../model/Shopping");
const Users = require("../model/User");
const Products = require("../model/Mongo");

router.get("/", async (req, res) => {
  res.render("shopCard", {
    title: "Korzina",
  });
});

router.post("/add/:id", async (req, res) => {
  const productid = req.params.id;
  let userid;

  try {
    userid = res.locals.user._id;
  } catch (error) {
    res.redirect("/");
    return;
  }

  const cart = res.locals.cart;
  const product = await Products.findById(productid);

  if (!product) {
    res.redirect("/");
    return;
  }
  console.log(cart.items);
  const isProductYes = cart.items.find((item) => item.product._id == productid);
  console.log(isProductYes);
  try {
    if (isProductYes) {
      await Users.findOneAndUpdate(
        { _id: userid, "cart.items.product": productid },
        {
          $set: {
            "cart.price": cart.price + product.price,
            "cart.items.$.count": isProductYes.count + 1,
          },
        }
      );
      res.redirect("/shopping");
      return;
    }

    await Users.findByIdAndUpdate(userid, {
      $push: { "cart.items": { product: productid } },
      $set: { "cart.price": cart.price + product.price },
    });
    console.log("product added to shopping cart: " + userid);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/shopping");
});

router.post("/upload/:productid/:mode", async (req, res) => {
  const userid = res.locals.user._id;
  const cart = res.locals.cart;
  const productid = req.params.productid;
  const mode = req.params.mode;
  const product = cart.items.find((item) => item.product._id == productid);

  if (!cart || !productid || !userid || !product) {
    res.redirect("/shopping");
    return;
  }

  try {
    if (mode === "plus") {
      await Users.findOneAndUpdate(
        { _id: userid, "cart.items.product": productid },
        {
          $inc: {
            "cart.items.$.count": 1,
          },
          $set: {
            "cart.price": cart.price + product.product.price,
          },
        }
      );
      res.json({
        message: "Product incremented to 1",
        ok: true,
        data: {
          count: product.count + 1,
          price: cart.price + product.product.price,
        },
      });
      return;
    }
    if (mode === "minus") {
      if (product.count == 1) {
        await Users.findOneAndUpdate(
          { _id: userid, "cart.items.product": productid },
          {
            $set: {
              "cart.price": cart.price - product.product.price,
            },
            $pull: {
              "cart.items": { product: productid },
            },
          }
        );
        res.json({
          message: "Product is deleted because count is 1",
          ok: true,
        });
        return;
      }
      const updatedData = await Users.findOneAndUpdate(
        { _id: userid, "cart.items.product": productid },
        {
          $inc: {
            "cart.items.$.count": -1,
          },
          $set: {
            "cart.price": cart.price - product.product.price,
          },
        }
      );
      res.json({
        message: "Product decrement to 1",
        ok: true,
        data: {
          count: product.count - 1,
          price: cart.price - product.product.price,
        },
      });
      return;
    }
  } catch (error) {
    res.json({ message: error, ok: false });
    return;
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
