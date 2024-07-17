const express = require('express');
const { getUser, postUser, patchUser } = require('../controllers/userController');

const router = new express.Router();


router.route("/").get(getUser).post(postUser).patch(patchUser)

module.exports = router;