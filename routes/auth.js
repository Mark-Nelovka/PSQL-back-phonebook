const express = require("express");

const { Reqistration, Login } = require("../controllers/auth");

const router = express.Router();

router.post("/reqistration", Reqistration);
router.post("/login", Login);

module.exports = router;
