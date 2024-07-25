const express = require("express");
const getUsers = require("../controllers/user/getUsers");
const postUser = require("../controllers/user/postUser");
const patchUser = require("../controllers/user/patchUser");


const router = new express.Router();

router.route("/").get(getUsers).post(postUser);

router.route("/:id").patch(patchUser);

module.exports = router;