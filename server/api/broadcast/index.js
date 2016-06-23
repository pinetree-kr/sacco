'use strict';

var express = require('express');
var controller = require('./broadcast.controller');
var produce = require('./produce');

var router = express.Router();

router.get('/', controller.index);
router.use('/produce', produce);

module.exports = router;