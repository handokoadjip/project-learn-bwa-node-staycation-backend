"use-strict";

const express = require("express");
const router = express.Router();

const bookingController = require("../../controllers/admin/bookingController");

https: router.get("/booking", bookingController.index);
https: router.put("/booking/:id/accept", bookingController.accept);
https: router.put("/booking/:id/reject", bookingController.reject);

module.exports = router;
