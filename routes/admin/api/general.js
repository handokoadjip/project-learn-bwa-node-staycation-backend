const express = require("express");
const router = express.Router();

const generalController = require("../../../controllers/admin/api/generalController");

https: router.get("/general/hero", generalController.hero);
https: router.get("/general/testimony", generalController.testimony);

module.exports = router;
