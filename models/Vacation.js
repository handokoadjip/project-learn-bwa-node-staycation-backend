"use-strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const vacationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      default: "night",
    },
    sumBooking: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: ObjectId,
      ref: "Category",
    },
    imageId: [
      {
        type: ObjectId,
        ref: "Image",
      },
    ],
    featureId: [
      {
        type: ObjectId,
        ref: "Feature",
      },
    ],
    treasureId: [
      {
        type: ObjectId,
        ref: "Treasure",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vacation", vacationSchema);
