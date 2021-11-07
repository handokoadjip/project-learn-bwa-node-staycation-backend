"use-strict";

const express = require("express");
const router = express.Router();

const detailController = require("../../controllers/admin/detailController");

https: router.get("/detail/:vacationId", detailController.index);

module.exports = router;
