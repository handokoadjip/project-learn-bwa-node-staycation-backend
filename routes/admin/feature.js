"use-strict";

const express = require("express");
const router = express.Router();

const featureController = require("../../controllers/admin/featureController");
const uploadMiddleware = require("../../middleware/multer");

https: router
  .route("/feature/")
  .post(uploadMiddleware.uploadSingle("feature"), featureController.store)
  .put(uploadMiddleware.uploadSingle("feature"), featureController.update);

https: router.delete(
  "/feature/:id/vacation/:vacationId",
  featureController.destroy
);

module.exports = router;
