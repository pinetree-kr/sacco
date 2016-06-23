'use strict';

var _ = require('lodash');
var User = require('./user.model');

// Get list of users
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(users);
  });
};

// Get a single user
exports.show = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    return res.json(user.profile);
  });
};

exports.login = function(req, res){
  var param = req.body;
  if(!param.phone || !param.password) return res.sendStatus(400);
  User.findOne({phone:param.phone}, function(err, user){
    if(err) return handleError(res, err);
    user.comparePassword(param.password, function(err, isMatch){
      if(err) return handleError(res, err);
      return res.json(user.profile);
    })
  })
}

exports.check = function(req, res){
  var param = req.body;
  if(!param.name || !param.phone) return res.sendStatus(400);
  User.findOne({name:param.name, phone:param.phone}, function(err, user){
    if(err) return handleError(res, err);
    if(!user) return res.sendStatus(404);
    return res.json(user.profile);
  })
}

// Creates a new user in the DB.
exports.create = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err) return handleError(res, err);
    return res.status(201).json(user);
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}