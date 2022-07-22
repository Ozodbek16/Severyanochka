const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
    
  res.render("order", {
    title: "Order",
  });
});

module.exports = router;
