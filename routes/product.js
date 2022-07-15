const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Mongo = require("../model/Mongo");
const Joi = require("joi");
const Categories = require("../model/Category");

router.get("/add", async (req, res) => {
  const categories = await Categories.find();

  res.render("add", {
    title: "add",
    categories,
  });
});

router.post("/add", upload.single("img"), async (req, res) => {
  const error = loginValidation(req.body);
  if (!!error) {
    console.log(error);
    res.redirect("/admin/product/add");
    return;
  }
  const { name, price, discount, star, brand, country, catalog, weight } =
    req.body;

  const product = new Mongo({
    name,
    price,
    discount,
    star,
    brand,
    country,
    catalog,
    weight,
    img: "/img/product-img/" + req.file.filename,
  });
  await product.save();
  res.redirect("/product/add");
});

function loginValidation(val) {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    surname: Joi.string(),
    adminImg: Joi.string(),
    password: Joi.string().required(),
  });

  const result = schema.validate(val);

  return result.error;
}

module.exports = router;
