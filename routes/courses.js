
module.exports = function(config) {


	// TODO : error handling
	var router 	= config.router;
	var auth 	= config.auth;

	var Course 	= config.Course;
	var Assignment 	= config.Assignment;
	var User 	= config.User;
	var Post 	= config.Post;
	var Comment 	= config.Comment;


	router.post('/courses/:course/assignments', auth, function(req, res, next) {
	
		var assignment = new Assignment(req.body);
        	assignment.course = req.course;
        	assignment.author = req.payload.username;
		assignment.users = req.course.users


		// save the assignment
        	assignment.save(function(err, assignment){
                	if(err){
                        	return next(err);
                	}

                	req.course.assignments.push(assignment);
                
			// save the course
			req.course.save(function(err, course) {
                        	if(err){
                                	return next(err);
                        	}
                        	res.json(assignment);
                	});
        	});
		 
	});


	router.post('/courses/:course/joinCourse', auth, function(req, res, next) {
		
		var courseId;

		req.course.users.push(req.payload.id);
		req.course.usernames.push(req.payload.username);
		req.course.save(function(err,course){
			if(err){
				return next(err);
			}
			User.findById(req.payload.id, function(err, user) {

	                	if(err) {
        	                	// do whatever
                	        	console.log(err);
               			}
                		courseId = req.params.course;

				if (user.myCourses.indexOf(courseId) >= 0) {
					console.log("Already joined this course");
					res.json(user);
				}
				else {
                			user.joinCourse(courseId);

                			user.save(function(err, userRet) {
                        			if (err) {
                                			console.log("Error Saving");
                                			return next(err);
                        			}
                        			res.json(userRet);
        	        		});
				}

        		});	
		});	
	
	});


	router.get('/courses', function(req, res, next) {

		Course.find(function(err, courses) {
			if(err) {
				return next(err);
			}
			res.json(courses);
  		});
	});


	router.post('/courses', auth, function(req, res, next) {

		var course = new Course(req.body);
	
		course.save(function(err, course) {
			if(err) {
				return next(err);
			}
			res.json(course);
		});
	}); 


	router.param('course', function(req, res, next, id) {

		var query = Course.findById(id);
		query.exec(function (err, course){
			if (err) {
				return next(err);
			}
			if (!course) {
				return next(new Error('can\'t find course'));
			}
			req.course = course;
			return next();
		});
	});


	router.get('/courses/:course', function(req, res) {
		req.course.populate('posts assignments comments', function(err, course) {	 
			res.json(req.course);
		});
	});


	router.put('/courses/:course/upvote', auth, function(req, res, next) {
		req.course.upvote(function(err, course){
			if (err) {
				return next(err);
			}
			res.json(course);
		});
	});


	router.put('/courses/:course/comments/:comment/upvote', auth, function(req, res, next) {
		req.comment.upvote(function(err, comment){
			if (err) {
				return next(err);
			}
			res.json(comment);
		});
	});



	router.post('/courses/:course/posts', auth, function(req, res, next) {
        	var post = new Post(req.body);
        	post.course = req.course;
        	post.author = req.payload.username;
        	post.save(function(err, post){
                	if(err){
                        	return next(err);
                	}

                	req.course.posts.push(post);
                	req.course.save(function(err, course) {
                        	if(err){
                                	return next(err);
                        	}

                        	res.json(post);
                	});
        	});
	});


	router.post('/courses/:course/comments', auth, function(req, res, next) {

		var comment = new Comment(req.body);
		comment.course = req.course;
		comment.author = req.payload.username;

		comment.save(function(err, comment){
			if(err){
				return next(err);
			}

			req.course.comments.push(comment);
			req.course.save(function(err, course) {
				if(err){
					return next(err);
				}

				res.json(comment);
			});
		});
	});



}  // end of courses module

