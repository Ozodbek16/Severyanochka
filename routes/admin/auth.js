const { Router } = require("express");
const router = Router();
const upload = require("../../middleware/avatarUpload");
const Admin = require("../../model/Admin");
const bcrypt = require("bcrypt");

// Get login
router.get("/login", (req, res) => {
  res.render("admin/login", {
    title: "Login page",
    layout: "../admin/layouts/main",
    admin: res.locals.admin
  });
});

// Logout
router.get("/logout", async (req, res) => {
  await req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Post login
router.post("/login", async (req, res) => {
  try {
    if (!req.body) {
      res.send("Login required");
      // res.redirect('/api/login')
    }

    const admin = await Admin.findOne({ username: req.body.username });

    if (!admin) {
      res.send("Username is incorrect");
      return;
    }

    const areSame = await bcrypt.compare(req.body.password, admin.password);

    if (!areSame) {
      res.send("Password is incorrect");
      return;
    }

    req.session.authen = true;
    req.session.admin = admin;
    req.session.save((err) => {
      if (err) throw err;
      res.redirect("/admin");
    });
  } catch (error) {
    console.log(error);
    res.redirect("/api/login");
  }
});

// Get register
router.get("/register", async (req, res) => {
  res.render("admin/register", {
    title: "Register page",
    layout: "../admin/layouts/main",
  });
});

// Post register
router.post("/register", upload.single("img"), async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashPassword;
  const { name, username, surname, password } = req.body;

  const admin = new Admin({
    name,
    username,
    surname,
    password,
    img: '/img/avatar/'+req.file.filename,
  });
  await admin.save();
  res.redirect("/api/login");
});

module.exports = router;
