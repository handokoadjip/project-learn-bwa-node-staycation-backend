"use-strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const treasureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isPopular: {
      type: Boolean,
    },
    vacationId: {
      type: ObjectId,
      ref: "Vacation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Treasure", treasureSchema);
