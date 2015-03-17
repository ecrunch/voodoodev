var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var passport = require('passport');
var Course = mongoose.model('Course');
var CourseTask =  mongoose.model('CourseTask');
var Comment = mongoose.model('Comment');
var SubTask =  mongoose.model('SubTask'); 
var Task =  mongoose.model('Task');
var Breather = mongoose.model('Breather');	
var User = mongoose.model('User'); 


router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.get('/tasks', function(req, res, next) {
  Task.find(function(err, tasks){
    if(err){ return next(err); }

    res.json(tasks);
  });
});

router.get('/breathers', function(req, res, next) {
  Breather.find(function(err, breathers){
    if(err){ return next(err); }

    res.json(breathers);
  });
});

var Task = mongoose.model('Task');
//var Schedule = mongoose.model('Schedule');

router.get('/schedule', function(req, res, next) {
	res.json(
		[
			{
				description: "fuck bitches",
				minutes: 30
			},
			{
				description: "get money",
				minutes: 30
			}
		]
	);
});

router.get('/courses', function(req, res, next) {
  Course.find(function(err, courses){
    if(err){ return next(err); }

    res.json(courses);
  });
});

router.post('/tasks', auth, function(req, res, next) {
  var task = new Task(req.body);

  task.save(function(err, task){
    if(err){ return next(err); }

    res.json(task);
  });
});

router.post('/breathers', auth, function(req, res, next) {
  var breather = new Breather(req.body);

  breather.save(function(err, task){
    if(err){ return next(err); }

    res.json(breather);
  });
});


router.post('/courses', auth, function(req, res, next) {
  var course = new Course(req.body);

  course.save(function(err, course){
    if(err){ return next(err); }

    res.json(course);
  });
}); 

router.param('task', function(req, res, next, id) {
  var query = Task.findById(id);

  query.exec(function (err, task){
    if (err) { return next(err); }
    if (!task) { return next(new Error('can\'t find task')); }

    req.task = task;
    return next();
  });
});

router.param('breather', function(req, res, next, id) {
  var query = Breather.findById(id);

  query.exec(function (err, breather){
    if (err) { return next(err); }
    if (!breather) { return next(new Error('can\'t find breather')); }

    req.breather = breather;
    return next();
  });
});


router.param('course', function(req, res, next, id) {
  var query = Course.findById(id);

  query.exec(function (err, course){
    if (err) { return next(err); }
    if (!course) { return next(new Error('can\'t find course')); }

    req.course = course;
    return next();
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});


router.param('subTask', function(req, res, next, id) {
  var query = SubTask.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!subTask) { return next(new Error('can\'t find Sub Task')); }

    req.subTask = subTask;
    return next();
  });
});

router.param('courseTask', function(req, res, next, id) {
  var query = CourseTask.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!courseTask) { return next(new Error('can\'t find Task')); }

    req.courseTask = courseTask;
    return next();
  });
});

router.get('/tasks/:task', function(req, res) {
         req.task.populate('subTasks comments', function(err, task) {
                 res.json(req.task);
        });

});

router.get('/courses/:course', function(req, res) {
	 req.course.populate('courseTasks comments', function(err, course) {	 
		 res.json(req.course);
	});

});

router.put('/courses/:course/upvote', auth, function(req, res, next) {
  req.course.upvote(function(err, course){
    if (err) { return next(err); }

    res.json(course);
  });
});

router.put('/tasks/:task/upvote', auth, function(req, res, next) {
  req.task.upvote(function(err, task){
    if (err) { return next(err); }

    res.json(task);
  });
});

router.put('/breathers/:breather/upvote', auth, function(req, res, next) {
  req.breather.upvote(function(err, breather){
    if (err) { return next(err); }

    res.json(breather);
  });
});


router.put('/courses/:course/comments/:comment/upvote', auth, function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment); 
  });
});

router.put('/tasks/:task/comments/:comment/upvote', auth, function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

router.put('/courses/:course/courseTasks/:courseTask/upvote', auth, function(req, res, next) {
  req.courseTask.upvote(function(err, courseTask){
    if (err) { return next(err); }

    res.json(courseTask);
  });
});

router.put('/tasks/:task/subTasks/:subTask/upvote', auth, function(req, res, next) {
  req.subTask.upvote(function(err, subTask){
    if (err) { return next(err); }

    res.json(subTask);
  });
});

router.post('/tasks/:task/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.task = req.task;
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.task.comments.push(comment);
    req.task.save(function(err, task) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.post('/courses/:course/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.course = req.course;
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.course.comments.push(comment);
    req.course.save(function(err, course) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.post('/tasks/:task/subTasks', auth, function(req, res, next) {
  var subTask = new SubTask(req.body);
  subTask.task = req.task;
  subTask.author = req.payload.username;

  subTask.save(function(err, subTask){
    if(err){ return next(err); }

    req.task.subTasks.push(subTask);
    req.task.save(function(err, task) {
      if(err){ return next(err); }

      res.json(subTask);
    });
  });
});

router.post('/courses/:course/courseTasks', auth, function(req, res, next) {
  var courseTask = new CourseTask(req.body);
  courseTask.course = req.course;
  courseTask.author = req.payload.username;

  courseTask.save(function(err, courseTask){
    if(err){ return next(err); }

    req.course.courseTasks.push(courseTask);
    req.course.save(function(err, course) {
      if(err){ return next(err); }

      res.json(courseTask);
    });
  });
});


module.exports = router;
