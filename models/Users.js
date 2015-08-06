var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	username: {type: String, lowercase: true, unique: true},  
	hash: String,
	salt: String,
	myBreathers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Breather' }],
	myCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
	myProgressTrackers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressTracker' }]


});

UserSchema.methods.joinBreather = function(breather){
		
	this.myBreathers.push(breather);
};

UserSchema.methods.joinProgressTracker = function(progressTracker){

        this.myProgressTrackers.push(progressTracker);
};

UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');

	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	};

UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

	return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
	id: this._id,
	username: this.username,
   	myCourses: this.myCourses,
	exp: parseInt(exp.getTime() / 1000),
	}, 'SECRET');
};

mongoose.model('User', UserSchema);
