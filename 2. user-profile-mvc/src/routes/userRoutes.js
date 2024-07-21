const express = require('express');
const { patchUser } = require('../controllers/user/patchUser');
const getUser = require('../controllers/user/getUser');
const postUser = require('../controllers/user/postUser');

const router = new express.Router();


router.route("/").get(getUser).post(postUser).patch(patchUser)

module.exports = router;