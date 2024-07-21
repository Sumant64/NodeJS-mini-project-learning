const express = require("express");
const getUsers = require("../controllers/user/getUser");


const router = new express.Router();

router.route("/").get(getUsers);

module.exports = router;