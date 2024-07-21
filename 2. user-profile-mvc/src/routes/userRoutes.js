const express = require('express');
const { patchUser } = require('../controllers/user/patchUser');
const getUser = require('../controllers/user/getUser');
const postUser = require('../controllers/user/postUser');
const getPagination = require('../controllers/user/getByPagination');
const getByFilter = require('../controllers/user/getFilter');

const router = new express.Router();


router.route("/").get(getUser).post(postUser);
router.patch("/:id", patchUser);
router.route("/pagination").get(getPagination);
router.get("/filter", getByFilter);

module.exports = router;