"use-strict";

const VacationModel = require("../../models/Vacation");
const FeatureModel = require("../../models/Feature");
const TreasureModel = require("../../models/Treasure");

module.exports = {
  index: async (req, res) => {
    const { vacationId } = req.params;
    try {
      const vacation = await VacationModel.findById(vacationId);
      const features = await FeatureModel.find({ vacationId });
      const treasure = await TreasureModel.find({ vacationId });

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("pages/admin/detail/index", {
        title: `Staycation | Detail ${vacation.name}`,
        user: req.session.user,
        vacation,
        features,
        treasure,
        alert,
      });
    } catch (error) {
      res.redirect(`/admin/detail/${vacationId}`);
    }
  },
};
