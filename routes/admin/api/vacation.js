const express = require("express");
const router = express.Router();

const vacationController = require("../../../controllers/admin/api/vacationController");

https: router.get("/vacation/most-picked", vacationController.mostPicked);

https: router.get("/vacation/:id", vacationController.show);

module.exports = router;
