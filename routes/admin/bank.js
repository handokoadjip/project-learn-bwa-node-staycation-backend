"use-strict";

const express = require("express");
const router = express.Router();

const bankController = require("../../controllers/admin/bankController");
const uploadMiddleware = require("../../middleware/multer");

https: router
  .route("/bank")
  .get(bankController.index)
  .post(uploadMiddleware.uploadSingle("bank"), bankController.store)
  .put(uploadMiddleware.uploadSingle("bank"), bankController.update);

https: router.delete("/bank/:id", bankController.destroy);

module.exports = router;
