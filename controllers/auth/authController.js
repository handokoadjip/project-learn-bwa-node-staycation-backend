"use-strict";

const userModel = require("../../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", {
          title: "Staycation | Login",
          alert,
        });
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      res.redirect("/");
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ username });

      if (!user) {
        req.flash("alertMessage", "Username does not exist");
        req.flash("alertStatus", "error");

        res.redirect("/");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash("alertMessage", "The password entered is wrong");
        req.flash("alertStatus", "error");

        res.redirect("/");
      }

      req.session.user = {
        id: user.id,
        username: user.username,
      };

      res.redirect("/admin/dashboard");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/");
    }
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
