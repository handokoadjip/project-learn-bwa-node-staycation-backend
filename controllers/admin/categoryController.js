"use-strict";

const CategoryModel = require("../../models/Category");

module.exports = {
  index: async (req, res) => {
    try {
      const categories = await CategoryModel.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("pages/admin/category/index", {
        title: "Staycation | Category",
        user: req.session.user,
        categories,
        alert,
      });
    } catch (error) {
      res.redirect("/admin/category");
    }
  },

  store: async (req, res) => {
    try {
      const category = await CategoryModel.create({ ...req.body });

      req.flash("alertMessage", `Category ${category.name} successfully added`);
      req.flash("alertStatus", "success");

      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/category");
    }
  },

  update: async (req, res) => {
    try {
      const { id, name } = req.body;

      const category = await CategoryModel.findById(id);
      category.name = name;
      await category.save();

      req.flash(
        "alertMessage",
        `Category ${category.name} successfully updated`
      );
      req.flash("alertStatus", "success");

      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/category");
    }
  },

  destroy: async (req, res) => {
    try {
      const category = await CategoryModel.findById(req.params.id);
      await category.remove();

      req.flash(
        "alertMessage",
        `Category ${category.name} successfully deleted`
      );
      req.flash("alertStatus", "success");

      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/category");
    }
  },
};
