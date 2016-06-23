'use strict';

var _ = require('lodash');
var Sacco = require('./sacco.model');
var User = require('../user/user.model');
var Product = require('../product/product.model');

// Get list of saccos
exports.index = function(req, res) {
  Sacco.find(function (err, saccos) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(saccos);
  });
};


// Get a single sacco
exports.show = function(req, res) {
  Sacco.findById(req.params.id)
  .populate('admin','name phone admin')
  .populate('users','name phone admin')
  .exec(function (err, sacco) {
    if(err) { return handleError(res, err); }
    if(!sacco) { return res.status(404).send('Not Found Sacco'); }
    return res.json(sacco);
  });
};

// Get a single sacco
exports.showProducts = function(req, res) {
  var saccoId = req.params.id;

  Product.find({
    sacco:saccoId
  })
  .exec(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.json(products);
  });
};


exports.find = function(req, res){
  var body = req.body;
  if(!body.name) return res.status(400).send('Bad Request for Find Sacco');
  Sacco.findOne({
    name:body.name
  })
  .populate('admin','name phone admin')
  .populate('users','name phone admin')
  .exec(function(err, sacco){
    if(err) return handleError(res, err);
    if(!sacco) return res.status(404).send('Not Found Sacco');
    return res.status(200).json(sacco);
  });
}

// Creates a new sacco in the DB.
exports.create = function(req, res) {
  var body = req.body;
  if(!body.admin) return res.status(400).send('Bad Request for Create Sacco');
  var newSacco = new Sacco(req.body);
  newSacco.save(function(err, sacco) {
    if (err) return handleError(res, err);
    return res.status(201).json(sacco);
  });
};

// join a new member to sacco in the DB.
exports.join = function(req, res) {
  var saccoId = req.params.id;
  var body = req.body;
  if(!body.user) return res.status(400).send('Bad Request for Join Sacco');
  User.findById(body.user, function(err, user){
    if(err) return handleError(res, err);
    if(!user) return res.status(404).send('Not Found User');
    user.sacco = saccoId;
    user.save(function(err){
      if(err) return handleError(res, err);
      Sacco.findById(saccoId, function(err, sacco){
        if(err) return handleError(res, err);
        if(!sacco) return res.status(404).send('Not Found Sacco');
        //console.log(body.user);
        sacco.users.push(body.user);
        sacco.save(function(err){
          if(err) return handleError(res, err);
          return res.status(200).json(sacco);
        });
      })
    });
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