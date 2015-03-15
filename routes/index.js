var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var CourseTask =  mongoose.model('CourseTask');
var Comment = mongoose.model('Comment');

router.get('/courses', function(req, res, next) {
  Course.find(function(err, courses){
    if(err){ return next(err); }

    res.json(courses);
  });
});

router.post('/courses', function(req, res, next) {
  var course = new Course(req.body);

  course.save(function(err, course){
    if(err){ return next(err); }

    res.json(course);
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

router.param('courseTask', function(req, res, next, id) {
  var query = CourseTask.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!courseTask) { return next(new Error('can\'t find Task')); }

    req.courseTask = courseTask;
    return next();
  });
});


router.get('/courses/:course', function(req, res) {
	 req.course.populate('courseTasks comments', function(err, course) {	 
		 res.json(req.course);
	});

});
/*
router.get('/courses/:course', function(req, res) {
         req.course.populate('comments', function(err, course) {
                 res.json(req.course);
        });

});
*/
router.put('/courses/:course/upvote', function(req, res, next) {
  req.course.upvote(function(err, course){
    if (err) { return next(err); }

    res.json(course);
  });
});

router.put('/courses/:course/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment); 
  });
});

router.put('/courses/:course/courseTasks/:courseTask/upvote', function(req, res, next) {
  req.courseTask.upvote(function(err, courseTask){
    if (err) { return next(err); }

    res.json(courseTask);
  });
});


router.post('/courses/:course/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.course = req.course;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.course.comments.push(comment);
    req.course.save(function(err, course) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.post('/courses/:course/courseTasks', function(req, res, next) {
  var courseTask = new CourseTask(req.body);
  courseTask.course = req.course;

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
