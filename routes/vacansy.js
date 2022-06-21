const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("vacansy", {
    title: "Vacansy",
  });
});

module.exports = router;
