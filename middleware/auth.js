const isLogin = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    req.flash("alertMessage", "Please login first");
    req.flash("alertStatus", "error");

    res.redirect("/");
  } else {
    next();
  }
};

module.exports = isLogin;
