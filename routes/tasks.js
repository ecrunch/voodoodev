
module.exports = function(config) {


	// TODO : error handling
	var router 	= config.router;
	var auth 	= config.auth;

	var Task	= config.Task;
	var Comment	= config.Comment;
	var User	= config.User;

	router.get('/tasks', function(req, res, next) {
		Task.find(function(err, tasks){
			if(err){
				return next(err);
			}
			res.json(tasks);
  		});
	});


	router.post('/tasks', auth, function(req, res, next) {


		var userId 	= req.payload.id;
		var userName 	= req.payload.username;

		var description = req.body.description;
		var dueDate = req.body.dueDate;
		var type = req.body.type;

		var task = new Task({
			description: 	description,
			dueDate: 	dueDate,
			type:		type,
			totalMinutes:	0,
			userId:		userId,
			userName:	userName
		});


		task.save(function(err, task) {
			if(err) {
				console.log("Had trouble saving task");
				return next(err);	
			}
			else {

				User.findById(userId, function(err, user) {	
					user.joinTask(task._id);
					console.log('here');
					user.save(function(err, user) {
						if(err) {
							console.log(err);
						}
						res.json(task);
					});
				});

			}
		});

	});


	router.param('task', function(req, res, next, id) {
	
		var query = Task.findById(id);
		query.exec(function (err, task) {
			if (err) {
				return next(err);
			}
			if (!task) {
				return next(new Error('can\'t find task'));
			}
			req.task = task;
			return next();
		});
	});



	router.get('/tasks/:task', function(req, res) {
		req.task.populate('comments', function(err, task) {
			res.json(req.task);
       		});
	});


	router.put('/tasks/:task/upvote', auth, function(req, res, next) {
		req.task.upvote(function(err, task){
			if (err) {
				return next(err);
		}
			res.json(task);
		});
	});


	router.put('/tasks/:task/comments/:comment/upvote', auth, function(req, res, next) {
		req.comment.upvote(function(err, comment){
			if (err) {
				return next(err);
			}
			res.json(comment);
		});
	});



	router.post('/tasks/:task/comments', auth, function(req, res, next) {

		var comment = new Comment(req.body);
		comment.task = req.task;
		comment.author = req.payload.username;

		comment.save(function(err, comment){
			if(err){
				return next(err);
			}
			req.task.comments.push(comment);
			req.task.save(function(err, task) {
				if(err){
					return next(err);
				}
				res.json(comment);
			});
  		});
	});


	router.put('/tasks/:task/time/:trackt', auth, function(req, res, next){

		var track = req.params.trackt;
		var current = req.task.totalMinutes;
		Task.findById(req.params.task, function(err, task) {
			if(err){
				console.log(err);
			}
			task.addTime(track);
		
			task.save(function(err, task){
				if (err){
					console.log("Error Saving");
					return next(err);
				}
				res.json(task);
			});
		});	
	});



	router.post('/tasks/:task/joinTask', auth, function(req, res, next) {

        	var taskId;

        	User.findById(req.payload.id, function(err, user) {

                	if(err) {
                        	// do whatever
                        	console.log(err);
                	}
                	taskId = req.params.task;

                	user.joinTask(taskId);

                	user.save(function(err, userRet) {
                        	if (err) {
                                	console.log("Error Saving");
                                	return next(err);
                        	}
                        	res.json(userRet);
                	});

        	});

	});


};	// end of tasks module
