'use strict';

var _ = require('lodash');
var Maize = require('./maize.model');

// Get list of maizes
exports.index = function(req, res) {
  Maize.find(function (err, maizes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(maizes);
  });
};

// Get a single maize
exports.show = function(req, res) {
  Maize.findById(req.params.id, function (err, maize) {
    if(err) { return handleError(res, err); }
    if(!maize) { return res.status(404).send('Not Found'); }
    return res.json(maize);
  });
};

// Creates a new maize in the DB.
exports.create = function(req, res) {
  Maize.create(req.body, function(err, maize) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(maize);
  });
};

// Updates an existing maize in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Maize.findById(req.params.id, function (err, maize) {
    if (err) { return handleError(res, err); }
    if(!maize) { return res.status(404).send('Not Found'); }
    var updated = _.merge(maize, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(maize);
    });
  });
};

// Deletes a maize from the DB.
exports.destroy = function(req, res) {
  Maize.findById(req.params.id, function (err, maize) {
    if(err) { return handleError(res, err); }
    if(!maize) { return res.status(404).send('Not Found'); }
    maize.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}