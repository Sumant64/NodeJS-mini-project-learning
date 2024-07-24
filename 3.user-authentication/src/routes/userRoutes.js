const express = require("express");
const getUsers = require("../controllers/user/getUser");
const postUser = require("../controllers/user/postUser");
const authMiddleware = require("../middleware/authMiddleware");
const admin = require("../middleware/adminCheck");
const getUserById = require("../controllers/user/getUserById");
const patchUserById = require("../controllers/user/patchUserById");


const router = new express.Router();

router.route("/").get(authMiddleware, admin, getUsers).post(authMiddleware, admin, postUser);
router.route("/:id").get(authMiddleware, getUserById).patch(authMiddleware, patchUserById)

module.exports = router;