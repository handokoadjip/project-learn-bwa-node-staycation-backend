"use-strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const bookingSchema = new Schema(
  {
    invoice: {
      type: String,
      required: true,
    },
    bookingStartDate: {
      type: Date,
      required: true,
    },
    bookingEndDate: {
      type: Date,
      required: true,
    },
    vacationId: {
      _id: {
        type: ObjectId,
        ref: "Vacation",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
    },
    total: {
      type: Number,
      required: true,
    },
    memberId: {
      type: ObjectId,
      ref: "Member",
    },
    bankId: {
      type: ObjectId,
      ref: "Bank",
    },
    payments: {
      proofPayment: {
        type: String,
        required: true,
      },
      bankFrom: {
        type: String,
        required: true,
      },
      accountHolder: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Proccess",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
