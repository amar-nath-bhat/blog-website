const express = require("express");
const router = express.Router();
const controller = require("../controller/user-controller");

router.post("/signup", (req, res) => controller.signupUser(req, res));
router.post("/login", (req, res) => controller.loginUser(req, res));
module.exports = router;
