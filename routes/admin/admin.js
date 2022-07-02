const express = require("express");
const router = express.Router();
const product = require("../product");

router.get("/", (req, res) => {
  res.render("admin", {
    title: "Menedjer",
  });
});

router.use("/product", product);
module.exports = router;