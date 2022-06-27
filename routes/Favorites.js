const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("Favorites.hbs", {
    title: "Favorites page",
  });
});

module.exports = router;
