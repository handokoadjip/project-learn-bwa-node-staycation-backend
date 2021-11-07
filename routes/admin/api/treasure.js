const express = require("express");
const router = express.Router();

const treasureController = require("../../../controllers/admin/api/treasureController");

https: router.get("/treasure/:id", treasureController.show);

module.exports = router;
