var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

require('./models/Comments');
require('./models/ProgressTrackers');
require('./models/Users');
require('./models/TaskWall');
require('./models/Community')
require('./models/Breathers');
require('./config/passport');
require('./models/Schedules');
require('./models/Posts');
require('./models/Links');

mongoose.connect('mongodb://localhost/brainless2db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// configure the multer (file uploads)
var multer = require('multer');
var done = false;

app.use(multer({dest: './uploads/',
    rename: function(fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting...');
    },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to ' + file.path);
        done = true;
    }
}));

app.post('/upload_file', function(req, res) {
    if (done == true) {
        console.log(req.files);
        res.end('File uploaded');
    }
});


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());



var allRouters = require('./routes/all');
var usersRouter = require('./routes/users');

//app.use('/', routesRouter);
app.use('/', allRouters);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
  	});
});


module.exports = app;
