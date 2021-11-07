"use-strict";

const express = require("express");
const router = express.Router();

const dashboardController = require("../../controllers/admin/dashboardController");

https: router.route("/dashboard").get(dashboardController.index);

module.exports = router;
