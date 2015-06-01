
// TODO : possibly refactor to be only funcs
var SchedulerObj = require('../src/Schedule.js');


module.exports = function(config) {


	// TODO : error handling
	var router 	= config.router;
	var auth 	= config.auth;

	// TODO : consider factoring out the Schedule code if we aren't saving
	var Schedule 	= config.Schedule;
	var Task 	= config.Task;
	var Breather 	= config.Breather;


	// TODO : this might not be a thing anymore if we get rid
	// of the objects
	var schedulerObj;

	// accepts a comma separated string	
	router.post('/new_schedule/:time/:tasks/:breathers', auth, function(req, res, next) {
		
		var userTasks 		= [];
                var userBreathers 	= [];

		var madeTasks 		= req.params.tasks.split(",") ;
		var madeBreathers 	= req.params.breathers.split(",");
		var hours 		= req.params.time;
		
		
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
			
								schedulerObj = new SchedulerObj({
									hours: hours,
									tasks: userTasks,
									breathers: userBreathers
								});		
                                                                var items = schedulerObj.makeNewSchedule();
                                                                res.json(items);
                                                        }
                                                }
                                        );
                                }
                        }
                );
        });     // end of nightmarish callback route from hell
				
		
	router.post('/new_schedule/:time', auth, function(req, res, next) {
		
		var userTasks 		= [];
		var userBreathers	= [];

		var hours 		= req.params.time;
		var userId 		= req.payload.id;

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
								schedulerObj = new SchedulerObj({
									hours: hours,
									tasks: userTasks,
									breathers: userBreathers
								});		
								var items = schedulerObj.makeNewSchedule();
								res.json(items);
							}
						}
					);
				}
			}
		);
	});	// end of nightmarish callback route from hell

};   // end of schedule module
