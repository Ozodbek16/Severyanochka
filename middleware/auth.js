module.exports = (req, res, next) => {
  if (!req.session.authen) {
    res.redirect("/api/login");
    return;
  }

  next();
};
