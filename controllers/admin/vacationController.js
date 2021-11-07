"use-strict";

const fs = require("fs-extra");
const path = require("path");

const VacationModel = require("../../models/Vacation");
const CategoryModel = require("../../models/Category");
const ImageModel = require("../../models/Image");

module.exports = {
  index: async (req, res) => {
    try {
      const vacations = await VacationModel.find();
      const categories = await CategoryModel.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("pages/admin/vacation/index", {
        title: "Staycation | Vacation",
        user: req.session.user,
        vacations,
        categories,
        alert,
      });
    } catch (error) {
      res.redirect("/admin/vacation");
    }
  },

  store: async (req, res) => {
    try {
      if (req.files.length > 0) {
        const vacation = await VacationModel.create({ ...req.body });

        const category = await CategoryModel.findById(req.body.categoryId);
        category.vacationId.push({ _id: vacation._id });
        await category.save();

        // TESTING
        // req.files.map(async (imageUpload) => {
        //   const image = await ImageModel.create({
        //     imageUrl: `images/vacation/${imageUpload.filename}`,
        //   });

        //   vacation.imageId.push({ _id: image._id });
        //   await vacation.save();
        // });

        for (let i = 0; i < req.files.length; i++) {
          const image = await ImageModel.create({
            imageUrl: `images/vacation/${req.files[i].filename}`,
          });

          vacation.imageId.push({ _id: image._id });
          await vacation.save();
        }

        req.flash(
          "alertMessage",
          `Vacation ${vacation.name} successfully added`
        );
        req.flash("alertStatus", "success");

        res.redirect("/admin/vacation");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/vacation");
    }
  },

  update: async (req, res) => {
    try {
      const vacation = await VacationModel.findById(req.body.id)
        .populate({ path: "imageId", select: "id imageUrl" })
        .populate({ path: "categoryId", select: "id name" });

      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          const image = await ImageModel.findById(vacation.imageId[i]._id);
          if (req.files[i].filename != undefined) {
            await fs.unlink(path.join(`public/${image.imageUrl}`));
            image.imageUrl = `images/vacation/${req.files[i].filename}`;
            await image.save();
          }
        }
      }

      vacation.name = req.body.name;
      vacation.price = req.body.price;
      vacation.country = req.body.country;
      vacation.city = req.body.city;
      vacation.description = req.body.desc;
      vacation.categoryId = req.body.categoryId;
      await vacation.save();

      req.flash(
        "alertMessage",
        `Vacation ${vacation.name} successfully updated`
      );
      req.flash("alertStatus", "success");

      res.redirect("/admin/vacation");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/vacation");
    }
  },

  destroy: async (req, res) => {
    try {
      const vacation = await VacationModel.findById(req.params.id);

      for (let i = 0; i < vacation.imageId.length; i++) {
        const image = await ImageModel.findById(vacation.imageId[i]);
        await fs.unlink(path.join(`public/${image.imageUrl}`));
        await image.remove();
      }

      await vacation.remove();

      req.flash(
        "alertMessage",
        `Vacation ${vacation.name} successfully deleted`
      );
      req.flash("alertStatus", "success");

      res.redirect("/admin/vacation");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/vacation");
    }
  },
};
