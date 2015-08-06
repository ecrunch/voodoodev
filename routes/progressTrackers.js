
module.exports = function(config) {


	// TODO : error handling
	var router 	= config.router;
	var auth 	= config.auth;

	var ProgressTracker	= config.ProgressTracker;
	var Comment	= config.Comment;
	var User	= config.User;
    var TaskWall= config.TaskWall;

	router.get('/progressTrackers', function(req, res, next) {
		ProgressTrackers.find(function(err, progressTrackers){
			if(err){
				return next(err);
			}
			res.json(progressTrackers);
  		});
	});
    

	router.post('/progressTrackers', auth, function(req, res, next) {


		var userId 	= req.payload.id;
		var userName 	= req.payload.username;

		var description = req.body.description;
		var dueDate = req.body.dueDate;
		var type = req.body.type;

		var progressTracker = new ProgressTracker({
			description: 	description,
			dueDate: 	dueDate,
			type:		type,
			totalMinutes:	0,
			userId:		userId,
			userName:	userName
		});


		progressTracker.save(function(err, progressTracker) {
			if(err) {
				console.log("Had trouble saving tracker");
				return next(err);	
			}
			else {

				User.findById(userId, function(err, user) {	
					user.joinProgressTracker(progressTracker._id);
					console.log('here');
					user.save(function(err, user) {
						if(err) {
							console.log(err);
						}
                        else {
                            var taskWall = new TaskWall({
                                description:    progressTracker.description,
                                dueDate:        progressTracker.dueDate,
                                type:           progressTracker.type,
                                progressTracker:progressTracker._id,
                                userIds:        progressTracker.userId,
                            });
                            console.log(taskWall)
                            
                            taskWall.save(function(err, taskWall) {
                                if(err) {
                                    console.log("Had trouble saving taskwall");
                                    return next(err);
                                }
                                else{
                                progressTracker.taskWall = taskWall._id;
                                progressTracker.save(function(err, progressTracker){
                                    if(err) {
                                        console.log("Had trouble saving task");
                                        return next(err);
                                    }
                                    else{
                                    console.log(progressTracker);
						            res.json(progressTracker);
                                    }
                                })
                                }
                            })
                        }
					});
				});

			}
		});

	});


	router.param('progressTracker', function(req, res, next, id) {
	
		var query = ProgressTracker.findById(id);
		query.exec(function (err, progressTracker) {
			if (err) {
				return next(err);
			}
			if (!progressTracker) {
				return next(new Error('can\'t find task'));
			}
			req.progressTracker = progressTracker;
			return next();
		});
	});


	router.put('/progressTrackers/:progressTracker/time/:trackt', auth, function(req, res, next){

		var track = req.params.trackt;
		var current = req.progressTracker.totalMinutes;
		ProgressTracker.findById(req.params.progressTracker, function(err, progressTracker) {
			if(err){
				console.log(err);
			}
			progressTracker.addTime(track);
		
			progressTracker.save(function(err, progressTracker){
				if (err){
					console.log("Error Saving");
					return next(err);
				}
				res.json(progressTracker);
			});
		});	
	});


};	// end of tasks module
