const express = require("express");
const router = express.Router();

const featureController = require("../../../controllers/admin/api/featureController");

https: router.get("/feature/:id", featureController.show);

module.exports = router;
