"use-strict";

const fs = require("fs-extra");
const path = require("path");

const VacationModel = require("../../models/Vacation");
const TreasureModel = require("../../models/Treasure");

module.exports = {
  store: async (req, res) => {
    const { vacationId } = req.body;
    try {
      const treasure = await TreasureModel.create({
        ...req.body,
        imageUrl: `images/treasure/${req.file.filename}`,
      });

      const vacation = await VacationModel.findById(vacationId);
      vacation.treasureId.push({ _id: treasure._id });
      await vacation.save();

      req.flash("alertMessage", `Treasure ${treasure.name} successfully added`);
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
      const treasure = await TreasureModel.findById(req.body.id);

      if (req.file != undefined) {
        await fs.unlink(path.join(`public/${treasure.imageUrl}`));
        treasure.imageUrl = `images/treasure/${req.file.filename}`;
      }

      treasure.name = req.body.name;
      treasure.category = req.body.category;
      await treasure.save();

      req.flash(
        "alertMessage",
        `Feature ${treasure.name} successfully updated`
      );
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
      const treasure = await TreasureModel.findById(req.params.id);
      const vacation = await VacationModel.findById(vacationId).populate({
        path: "treasureId",
        select: "id imageUrl",
      });

      console.log(treasure);

      vacation.treasureId.pull({ _id: treasure._id });
      await vacation.save();

      await fs.unlink(path.join(`public/${treasure.imageUrl}`));
      await treasure.remove();

      req.flash(
        "alertMessage",
        `Treasure ${treasure.name} successfully deleted`
      );
      req.flash("alertStatus", "success");

      res.redirect(`/admin/detail/${vacationId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect(`/admin/detail/${vacationId}`);
    }
  },
};
