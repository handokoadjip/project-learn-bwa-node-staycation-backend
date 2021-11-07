"use-strict";

const express = require("express");
const router = express.Router();

const vacationController = require("../../controllers/admin/vacationController");
const uploadMiddleware = require("../../middleware/multer");

https: router
  .route("/vacation")
  .get(vacationController.index)
  .post(uploadMiddleware.uploadMultiple("vacation"), vacationController.store)
  .put(uploadMiddleware.uploadMultiple("vacation"), vacationController.update);

https: router.delete("/vacation/:id", vacationController.destroy);

module.exports = router;
