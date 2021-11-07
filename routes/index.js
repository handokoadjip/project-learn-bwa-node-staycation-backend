"use-strict";

var express = require("express");
var router = express.Router();

const authController = require("../controllers/auth/authController");

/* GET home page. */
router.get("/", authController.index);
router.post("/auth-login", authController.login);
router.post("/auth-logout", authController.logout);

module.exports = router;
