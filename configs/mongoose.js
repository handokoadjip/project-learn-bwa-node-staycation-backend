"use-strict";

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/staycation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
