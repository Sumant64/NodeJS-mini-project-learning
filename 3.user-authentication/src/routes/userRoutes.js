const express = require("express");
const getUsers = require("../controllers/user/getUser");
const postUser = require("../controllers/user/postUser");


const router = new express.Router();

router.route("/").get(getUsers).post(postUser);

module.exports = router;