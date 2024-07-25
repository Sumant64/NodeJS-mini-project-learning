const express = require("express");
const postTask = require("../controllers/task/postTask");

const router = new express.Router();

router.route("/").post(postTask);


module.exports = router;