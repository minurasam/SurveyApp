"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/private'),
    getPrivateData = _require.getPrivateData;

var _require2 = require('../middleware/auth'),
    protect = _require2.protect;

router.route("/").get(protect, getPrivateData);
module.exports = router;