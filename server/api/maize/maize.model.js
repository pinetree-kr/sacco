'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MaizeSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Maize', MaizeSchema);