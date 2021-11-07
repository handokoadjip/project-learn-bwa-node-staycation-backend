const express = require("express");
const router = express.Router();

const categoryController = require("../../../controllers/admin/api/categoryController");

https: router.get("/category", categoryController.index);
https: router.get("/category/:id", categoryController.show);

module.exports = router;
