const User = require("../model/User");
module.exports = async (req, res, next) => {
  if (!req.session.user) {
      return next();
  }

  res.locals.user = await User.findById(req.session.user._id);
  next();
};
