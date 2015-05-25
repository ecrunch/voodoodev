

module.exports = function(router, User, passport, Breather, Course, Task, Comment, auth) {

	/* GET home page. */
	router.get('/', function(req, res, next) {
		res.render('index', { title: 'Express' });
	});


	router.get('/test', function(req, res, next) {
		res.render('test', {title: 'Test'});
	});

	router.post('/register', function(req, res, next){

		if(!req.body.username || !req.body.password){
			return res.status(400).json({message: 'Please fill out all fields'});
		}

		var user = new User();

		user.username = req.body.username;

		user.setPassword(req.body.password);

		user.save(function (err){
			if(err){ 
				return next(err); 
			}

			return res.json({token: user.generateJWT()});
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
			}
			else {
				return res.status(401).json(info);
			}
		})(req, res, next);
	});

	router.get('/user/currUser', function(req, res, next) {
		var userId = req.payload.id;
		res.json({token: userId});
	});

	// figure out how to use get requests or at least the difference
	// between them


	router.post('/user/tasks', auth, function(req, res, next) {

		var userId = req.payload.id;

		User.findById(userId, function(err, user) {
			
			if (err) {
				next(err);
			}
			else {

				// TODO figure out why I did this in the first place  ..? weeird
				var taskIds = user.myTasks.filter(function(item, pos) {
					return user.myTasks.indexOf(item) == pos;
				});


				Task.find({
					'_id': {
						$in: taskIds
					}
				},
				function(err, tasks) {
					
					if (err) {
						next(err);
					}
					else {
						res.json({
							taskIds: taskIds,
							tasks: tasks
						});
					}
				});  // end of task callback

			}
		});


	});

	router.post('/user/breathers', auth, function(req, res, next) {

		var userId = req.payload.id;

		User.findById(userId, function(err, user) {
			
			if (err) {
				next(err);
			}
			else {

				// TODO figure out why I did this in the first place  ..? weeird
				var breatherIds = user.myBreathers.filter(function(item, pos) {
					return user.myBreathers.indexOf(item) == pos;
				});


				Breather.find({
					'_id': {
						$in: breatherIds
					}
				},
				function(err, breathers) {
				
					if (err) {
						next(err);
					}
					else {
						res.json({
							breatherIds: breatherIds,
							breathers: breathers
						});
					}
				});  // end of breathers callback

			}
		});


	});


	router.post('/user/courses', auth, function(req, res, next) {

		var userId = req.payload.id;

		User.findById(userId, function(err, user) {
			
			if (err) {
				next(err);
			}
			else {

				// TODO figure out why I did this in the first place  ..? weeird
				var courseIds = user.myCourses.filter(function(item, pos) {
					return user.myCourses.indexOf(item) == pos;
				});

				Course.find({
					'_id': {
						$in: courseIds
					}
				},
				function(err, courses) {
				
					if (err) {
						next(err);
					}
					else {
						res.json({
							courseIds: courseIds,
							courses: courses
						});
					}	
				});  // end of courses callback

			}
		});


	});


	router.param('comment', function(req, res, next, id) {

		var query = Comment.findById(id);
		query.exec(function (err, comment){
			if (err) {
				return next(err);
			}
			if (!comment) {
				return next(new Error('can\'t find comment'));
			}
			req.comment = comment;
			return next();
		});
	});


};  // end of module
