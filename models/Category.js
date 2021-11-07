"use-strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    vacationId: [
      {
        type: ObjectId,
        ref: "Vacation",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
