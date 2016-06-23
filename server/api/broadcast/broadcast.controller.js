'use strict';

var _ = require('lodash');

var menu = ['Produce','News']
// Get list of broadcasts
exports.index = function(req, res) {
  return res.status(200).json(menu);
};

function handleError(res, err) {
  return res.status(500).send(err);
}