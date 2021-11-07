"use-strict";

const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const fs = require("fs-extra");
const path = require("path");

const BookingModel = require("../../../models/Booking");
const VacationModel = require("../../../models/Vacation");
const MemberModel = require("../../../models/Member");

require("../../../models/Member");
require("../../../models/Bank");

const response = require("../../../configs/response");

module.exports = {
  validate: () => {
    return [
      body("bookingStartDate", "booking date start is required").isLength({
        min: 1,
      }),
      body("bookingEndDate", "booking date end is required").isLength({
        min: 1,
      }),
      body("vacationId", "vacation is required").isLength({ min: 1 }),
      body("duration", "duration is required").isLength({ min: 1 }),
      body("firstName", "First name is required").isLength({ min: 1 }),
      body("lastName", "Last name is required").isLength({ min: 1 }),
      body("email", "Email  is required").isLength({ min: 1 }),
      body("phoneNumber", "Phone number is required").isLength({ min: 1 }),
      body("accountHolder", "Account holder is required").isLength({
        min: 1,
      }),
      body("bankFrom", "bankFrom is required").isLength({ min: 1 }),
    ];
  },
  show: async (req, res) => {
    try {
      const booking = await BookingModel.findById(req.params.id)
        .populate("memberId")
        .populate("bankId");

      const data = {
        status: true,
        message: "Data succesfully retrieved",
        results: booking,
      };

      response(200, data, res);
    } catch (error) {
      const data = {
        code: error.status || 500,
        status: false,
        message: error.message,
        results: error.data,
      };

      response(data.code, data, res);
    }
  },

  store: async (req, res) => {
    const {
      bookingStartDate,
      bookingEndDate,
      vacationId,
      duration,
      firstName,
      lastName,
      email,
      phoneNumber,
      accountHolder,
      bankFrom,
    } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await fs.unlink(
          path.join(`public/images/payment/${req.file.filename}`)
        );

        const err = new Error("Invalid value");
        err.status = 400;
        err.data = errors.array();

        throw err;
      }

      if (!req.file) {
        const err = new Error("Image required");
        err.status = 422;

        throw err;
      }

      const vacation = await VacationModel.findById(vacationId);
      if (!vacation) {
        await fs.unlink(
          path.join(`public/images/payment/${req.file.filename}`)
        );

        const err = new Error("Vacation not found");
        err.status = 404;

        throw err;
      }

      vacation.sumBooking += 1;
      await vacation.save();

      let total = vacation.price * duration;
      let tax = total * 0.1;

      const member = await MemberModel.create({
        firstName,
        lastName,
        email,
        phoneNumber,
      });

      const dataBooking = {
        invoice: new Date().getTime(),
        bookingStartDate,
        bookingEndDate,
        vacationId: {
          _id: vacation._id,
          name: vacation.name,
          price: vacation.price,
          duration,
        },
        total: (total += tax),
        memberId: member._id,
        payments: {
          proofPayment: `images/payment/${req.file.filename}`,
          bankFrom,
          accountHolder,
        },
      };

      await BookingModel.create(dataBooking);

      const data = {
        status: true,
        message: "You succesfully booked",
      };

      response(201, data, res);
    } catch (error) {
      const data = {
        code: error.status || 500,
        status: false,
        message: error.message,
        results: error.data,
      };

      response(data.code, data, res);
    }
  },
};
