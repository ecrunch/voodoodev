
//import all of the routers into one mega router

var jwt 	= require('express-jwt');
var mongoose 	= require('mongoose');
var router 	= require('express').Router();
var passport	= require('passport');

var config = {
	router: 	router,
	auth:		jwt({secret: 'SECRET', userProperty: 'payload'}),
	passport:	passport,

	Course: 	mongoose.model('Course'),
	Comment: 	mongoose.model('Comment'),
	Task: 		mongoose.model('Task'),
	Breather: 	mongoose.model('Breather'),
	User: 		mongoose.model('User'),
	Schedule: 	mongoose.model('Schedule'),
	Assignment: 	mongoose.model('Assignment'),
	Post: 		mongoose.model('Post'),
	Link: 		mongoose.model('Link')
};


require('./index.js')(config);
require('./tasks.js')(config);
require('./assignments.js')(config);
require('./schedules.js')(config);
require('./breathers.js')(config);
require('./courses.js')(config);
 

module.exports = router;
