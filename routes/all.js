
//import all of the routers into one mega router

var express 	= require('express');
var jwt 	= require('express-jwt');
var mongoose 	= require('mongoose');
var passport	= require('passport');

var router 	= express.Router();
var auth	= jwt({secret: 'SECRET', userProperty: 'payload'});

var Course = mongoose.model('Course');
var Comment = mongoose.model('Comment');
var Task =  mongoose.model('Task');
var Breather = mongoose.model('Breather');	
var User = mongoose.model('User'); 
var Schedule = mongoose.model('Schedule');
var Assignment = mongoose.model('Assignment');
var Post = mongoose.model('Post');
var Link = mongoose.model('Link');

//TODO : make these dictionaries or something easier
// to deal with

// at least standardize the order shit is in

require('./index.js')(
	router, User, passport, Breather, Course, Task, Comment, auth
);
require('./tasks.js')(
	router, Task, auth, Comment, User
);
require('./assignments.js')(
	router, Assignment, auth
);
require('./schedules.js')(
	router, Schedule, Task, Breather, auth
);
require('./breathers.js')(
	router, Breather, auth, Link, User
);
require('./courses.js')(
	router, Course, auth, Assignment, User, Post, Comment
);
 

module.exports = router;
