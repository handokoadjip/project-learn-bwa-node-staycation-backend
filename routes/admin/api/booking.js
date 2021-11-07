const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../../../middleware/multer");

const bookingController = require("../../../controllers/admin/api/bookingController");

https: router.post(
  "/booking/store",
  [uploadMiddleware.uploadSingle("payment"), bookingController.validate()],
  bookingController.store
);
https: router.get("/booking/:id", bookingController.show);

module.exports = router;
