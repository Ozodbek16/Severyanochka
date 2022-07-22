const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  
  res.render("vacansy", {
    title: "Vacansy",
  });
});

module.exports = router;
