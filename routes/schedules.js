
module.exports = function(config) {


	// TODO : error handling
	var router 	= config.router;
	var auth 	= config.auth;

	var Schedule 	= config.Schedule;
	var Task 	= config.Task;
	var Breather 	= config.Breather;

	
	router.post('/new_schedule/:time/:tasks/:breathers', auth, function(req, res, next) {
		var userTasks = [];
                var userBreathers = [];
		var madeTasks = req.params.tasks.split(",") ;
		var madeBreathers =	req.params.breathers.split(",");
		var hours = req.params.time;
		
		
		Task.find({ '_id':{ $in:
				madeTasks
				}
			},
                        function(err, tasks) {
                                if(err) {
                                        console.log("Could not load tasks");
                                        return next(err);
                                }
                                else {
                                        if(tasks.length > 0) {
                                                userTasks = tasks;
                                        }
					
					Breather.find({ '_id':{ $in:
							 madeBreathers
							}
                                                },
                                                function(err, breathers) {

                                                        if (err) {
                                                                return next(err);
                                                        }
                                                        else {
                                                                if (breathers.length > 0) {
                                                                        userBreathers = breathers;
                                                                }
					
								var schedule = new Schedule();
                                                                var items = schedule.createNew(
                                                                        hours,
                                                                        userTasks,
                                                                        userBreathers
                                                                );
                                                                res.json(items);
                                                        }
                                                }
                                        );
                                }
                        }
                );
        });     // end of nightmarish callback route from hell
				
	
		
	router.post('/new_schedule/:time', auth, function(req, res, next) {
		//var userTasks = mockTasks();
		var userTasks = [];
		var userBreathers = [];
		//var userBreathers = mockBreathers();
		var hours = req.params.time;

		var userId = req.payload.id;

		Task.find(
			{
				'userId': userId
			},
			function(err, tasks) {
				if(err) {
					console.log("Could not load tasks");
					return next(err);
				}
				else {

					if(tasks.length > 0) {
						userTasks = tasks;
					}

					Breather.find(
						{
							'userId': userId
						},
						function(err, breathers) {
						
							if (err) {
								return next(err);
							}
							else {
								if (breathers.length > 0) {
									userBreathers = breathers; 
								}


								var schedule = new Schedule();
								var items = schedule.createNew(
									hours,
									userTasks,
									userBreathers
								);
								res.json(items);
							}
						}
					);
				}
			}
		);
	});	// end of nightmarish callback route from hell

};   // end of schedule module
