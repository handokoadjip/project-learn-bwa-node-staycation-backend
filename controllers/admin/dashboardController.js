"use-strict";

const MemberModel = require("../../models/Member");
const BookingModel = require("../../models/Booking");
const VacationModel = require("../../models/Vacation");

module.exports = {
  index: async (req, res) => {
    try {
      const member = await MemberModel.find();
      const booking = await BookingModel.find();
      const vacation = await VacationModel.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("pages/admin/dashboard/index", {
        title: "Staucation | Dashboard",
        user: req.session.user,
        member,
        booking,
        vacation,
        alert,
      });
    } catch (error) {
      res.redirect(`/admin/detail/${vacationId}`);
    }
  },
};
