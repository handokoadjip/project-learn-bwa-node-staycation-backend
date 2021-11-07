"use-strict";

const fs = require("fs-extra");
const path = require("path");

const VacationModel = require("../../models/Vacation");
const FeatureModel = require("../../models/Feature");

module.exports = {
  store: async (req, res) => {
    const { vacationId } = req.body;
    try {
      const feature = await FeatureModel.create({
        ...req.body,
        imageUrl: `images/feature/${req.file.filename}`,
      });

      const vacation = await VacationModel.findById(vacationId);
      vacation.featureId.push({ _id: feature._id });
      await vacation.save();

      req.flash("alertMessage", `Feature ${feature.name} successfully added`);
      req.flash("alertStatus", "success");

      res.redirect(`/admin/detail/${vacationId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect(`/admin/detail/${vacationId}`);
    }
  },

  update: async (req, res) => {
    const { vacationId } = req.body;
    try {
      const feature = await FeatureModel.findById(req.body.id);

      if (req.file != undefined) {
        await fs.unlink(path.join(`public/${feature.imageUrl}`));
        feature.imageUrl = `images/feature/${req.file.filename}`;
      }

      feature.name = req.body.name;
      feature.qty = req.body.qty;
      await feature.save();

      req.flash("alertMessage", `Feature ${feature.name} successfully updated`);
      req.flash("alertStatus", "success");

      res.redirect(`/admin/detail/${vacationId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect(`/admin/detail/${vacationId}`);
    }
  },

  destroy: async (req, res) => {
    const { vacationId } = req.params;

    try {
      const feature = await FeatureModel.findById(req.params.id);
      const vacation = await VacationModel.findById(vacationId).populate({
        path: "featureId",
        select: "id imageUrl",
      });

      vacation.featureId.pull({ _id: feature._id });
      await vacation.save();

      await fs.unlink(path.join(`public/${feature.imageUrl}`));
      await feature.remove();

      req.flash("alertMessage", `Feature ${feature.name} successfully deleted`);
      req.flash("alertStatus", "success");

      res.redirect(`/admin/detail/${vacationId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect(`/admin/detail/${vacationId}`);
    }
  },
};
