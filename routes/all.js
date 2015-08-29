
//import all of the routers into one mega router

var jwt 	= require('express-jwt');
var mongoose 	= require('mongoose');
var router 	=   require('express').Router();
var passport	= require('passport');

var config = {
	router: 	router,
	auth:		jwt({secret: 'SECRET', userProperty: 'payload'}),
	passport:	passport,

	Comment: 	            mongoose.model('Comment'),
    ProgressTracker: 		mongoose.model('ProgressTracker'),
    TaskWall:               mongoose.model('TaskWall'),
    Breather: 	            mongoose.model('Breather'),
	User: 		            mongoose.model('User'),
	Schedule: 	            mongoose.model('Schedule'),
	Post: 		            mongoose.model('Post'),
	Link: 		            mongoose.model('Link'),
    Content:                mongoose.model('Content')
};


require('./index.js')(config);
require('./progressTrackers.js')(config);
require('./taskWalls.js')(config);
require('./schedules.js')(config);
require('./breathers.js')(config);
 

module.exports = router;
