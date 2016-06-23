'use strict';

var mongoose = require('mongoose'),
	bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  name: {
  	type: String,
  	required: true
  },
  phone: {
  	type: String,
  	required: true
  },
  password: {
  	type: String,
  	required: true
  },
  sacco: {
    type: Schema.Types.ObjectId,
    ref: 'Sacco'
  },
  admin:{
  	type:Boolean,
  	default:false
  }
});

// Validate email is not taken
UserSchema
  .path('phone')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({phone: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified phone is already in use.');


// Public profile information
UserSchema
	.virtual('profile')
	.get(function() {
		return {
			'_id' : this._id,
			'name': this.name,
			'phone': this.phone,
			'sacco': this.sacco,
			'admin': this.admin
		};
	});

UserSchema.pre('save', function(next){
	var self = this;
	if(!self.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);
		console.log(salt);
		bcrypt.hash(self.password, salt, function(err, hash){
			if(err) return next(err);
			self.password = hash;
			next();
		})
	});
});

UserSchema.methods.comparePassword = function(pw, callback){
	bcrypt.compare(pw, this.password, function(err, isMatch){
		if(err) return callback(err);
		callback(null, isMatch);
	})
}

module.exports = mongoose.model('User', UserSchema);