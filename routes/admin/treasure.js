"use-strict";

const express = require("express");
const router = express.Router();

const treasureController = require("../../controllers/admin/treasureController");
const uploadMiddleware = require("../../middleware/multer");

https: router
  .route("/treasure/")
  .post(uploadMiddleware.uploadSingle("treasure"), treasureController.store)
  .put(uploadMiddleware.uploadSingle("treasure"), treasureController.update);

https: router.delete(
  "/treasure/:id/vacation/:vacationId",
  treasureController.destroy
);

module.exports = router;
