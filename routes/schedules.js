
module.exports = function(router, Schedule, Task, Breather, auth) {

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
