const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("favorites", {
    title: "Favorites page",
  });
});

module.exports = router;
