"use-strict";

const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/admin/categoryController");

https: router
  .route("/category")
  .get(categoryController.index)
  .post(categoryController.store)
  .put(categoryController.update);

https: router.delete("/category/:id", categoryController.destroy);

module.exports = router;
