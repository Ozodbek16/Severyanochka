const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.hbs", {
    title: "Главная страница",
  });
});

module.exports = router;