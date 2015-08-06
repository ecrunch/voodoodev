
// TODO : possibly refactor to be only funcs
var SchedulerObj = require('../src/Schedule.js');


module.exports = function(config) {


	// TODO : error handling
	var router 	= config.router;
	var auth 	= config.auth;

	// TODO : consider factoring out the Schedule code if we aren't saving
	var Schedule 	= config.Schedule;
	var ProgressTracker 	= config.ProgressTracker;
	var Breather 	= config.Breather;


	// TODO : this might not be a thing anymore if we get rid
	// of the objects
	var schedulerObj;

	// accepts a comma separated string	
	router.post('/new_schedule/:time/:progressTrackers/:breathers', auth, function(req, res, next) {
		
		var userProgressTrackers 		= [];
        var userBreathers 	= [];

		var madeProgressTrackers 		= req.params.progressTrackers.split(",") ;

        var madeBreathers 	= req.params.breathers.split(",");
		var hours 		= req.params.time;
		
		
		ProgressTracker.find({ '_id':{ $in:
				madeProgressTrackers
				}
			},
                        function(err, progressTrackers) {
                                if(err) {
                                        console.log("Could not load tasks");
                                        return next(err);
                                }
                                else {
                                        if(progressTrackers.length > 0) {
                                                userProgressTrackers = progressTrackers;
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
									progressTrackers: userProgressTrackers,
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
				
		

};   // end of schedule module
