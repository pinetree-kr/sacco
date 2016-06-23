'use strict';

var express = require('express');
var controller = require('./sacco.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/find', controller.find);
router.get('/:id', controller.show);
router.get('/:id/products', controller.showProducts);
router.post('/:id/join', controller.join);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;