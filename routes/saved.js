const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
    
  res.render("saved", {
    title: "Saved",
  });
});

module.exports = router;