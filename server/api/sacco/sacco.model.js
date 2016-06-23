'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SaccoSchema = new Schema({
  name: {
  	type: String,
  	required: true,
  	index: { unique: true }
  },
  coord:{
  	lat:{
  		type: Number,
  		required: true
  	},
  	long:{
  		type: Number,
  		required: true
  	}
  },
  admin:{
  	type: Schema.Types.ObjectId,
    ref: 'User'
  },
  users:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// Validate email is not taken
SaccoSchema
  .path('name')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({name: value}, function(err, sacco) {
      if(err) throw err;
      if(sacco) {
        if(self.id === sacco.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified sacco is already in use.');

module.exports = mongoose.model('Sacco', SaccoSchema);