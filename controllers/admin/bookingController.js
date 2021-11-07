"use-strict";

const BookingModel = require("../../models/Booking");
require("../../models/Member");
require("../../models/Bank");

module.exports = {
  index: async (req, res) => {
    try {
      const bookings = await BookingModel.find()
        .populate("memberId")
        .populate("bankId");

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("pages/admin/booking/index", {
        title: "Staycation | Booking",
        user: req.session.user,
        bookings,
        alert,
      });
    } catch (error) {
      res.redirect("/admin/booking");
    }
  },

  accept: async (req, res) => {
    try {
      const booking = await BookingModel.findById(req.params.id);

      booking.payments.status = "Accept";
      await booking.save();

      req.flash(
        "alertMessage",
        `Success acceptt payment invoice ${booking.invoice}`
      );
      req.flash("alertStatus", "success");

      res.redirect("/admin/booking");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/booking");
    }
  },

  reject: async (req, res) => {
    try {
      const booking = await BookingModel.findById(req.params.id);

      booking.payments.status = "Reject";
      await booking.save();

      req.flash(
        "alertMessage",
        `Success reject payment invoice ${booking.invoice}`
      );
      req.flash("alertStatus", "success");

      res.redirect("/admin/booking");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/booking");
    }
  },
};
