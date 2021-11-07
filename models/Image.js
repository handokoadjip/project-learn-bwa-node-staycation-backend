"use-strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
