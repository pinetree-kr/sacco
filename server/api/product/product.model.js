'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
	sacco: {
	    type: Schema.Types.ObjectId,
	    ref: 'Sacco',
	    requried: true
	},
	name:{
		type:String,
		required: true
	},
	quantity:{
		type:Number,
		required: true
	},
	price:{
		type:Number,
		required: true
	},
	idle:{
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model('Product', ProductSchema);