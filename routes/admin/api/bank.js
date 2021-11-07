const express = require("express");
const router = express.Router();

const bankController = require("../../../controllers/admin/api/bankController");

https: router.get("/bank/:id", bankController.show);

module.exports = router;
