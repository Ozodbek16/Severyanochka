const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const upload = require("../middleware/avatarUpload");

router.get("/", async (req, res) => {
 
  res.render("regstration", {
    title: "regstration page",
  });
});

router.post("/", upload.single("img"), async (req, res) => {
  if (req.file) {
    req.body.img = req.file.filename;
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);
  const userN = new User(req.body);
  await userN.save();

  console.log(userN);

  res.redirect("/");
});

module.exports = router;
