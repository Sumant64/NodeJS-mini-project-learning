const express = require("express");
const login = require("../controllers/auth/login");

let router = new express.Router();

router.post("/login", login);

module.exports = router;