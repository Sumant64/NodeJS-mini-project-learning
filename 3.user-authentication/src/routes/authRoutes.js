const express = require("express");
const login = require("../controllers/auth/login");
const authMiddleware = require("../middleware/authMiddleware");
const logout = require("../controllers/auth/logout");

let router = new express.Router();

router.post("/login", login);
router.get("/logout", authMiddleware, logout)

module.exports = router;