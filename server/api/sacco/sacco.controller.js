'use strict';

var _ = require('lodash');
var Sacco = require('./sacco.model');

// Get list of saccos
exports.index = function(req, res) {
  Sacco.find(function (err, saccos) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(saccos);
  });
};

// Get a single sacco
exports.show = function(req, res) {
  Sacco.findById(req.params.id, function (err, sacco) {
    if(err) { return handleError(res, err); }
    if(!sacco) { return res.status(404).send('Not Found'); }
    return res.json(sacco);
  });
};

// Creates a new sacco in the DB.
exports.create = function(req, res) {
  var body = req.body;
  if(!body.admin) return res.sendStatus(401);
  var newSacco = new Sacco(req.body);
  newSacco.save(function(err, sacco) {
    if (err) return handleError(res, err);
    return res.status(201).json(sacco);
  });
};

// Updates an existing sacco in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sacco.findById(req.params.id, function (err, sacco) {
    if (err) { return handleError(res, err); }
    if(!sacco) { return res.status(404).send('Not Found'); }
    var updated = _.merge(sacco, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(sacco);
    });
  });
};

// Deletes a sacco from the DB.
exports.destroy = function(req, res) {
  Sacco.findById(req.params.id, function (err, sacco) {
    if(err) { return handleError(res, err); }
    if(!sacco) { return res.status(404).send('Not Found'); }
    sacco.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}