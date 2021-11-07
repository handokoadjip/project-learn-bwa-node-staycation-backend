"use-strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const featureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    vacationId: {
      type: ObjectId,
      ref: "Vacation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", featureSchema);
