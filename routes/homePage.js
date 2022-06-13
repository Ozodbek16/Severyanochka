const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.hbs", {
    title: "Главная страница",
  });
});
router.get("/saved", (req, res) => {
  res.render("saved.hbs", {
    title: "Saved",
  });
});

module.exports = router;