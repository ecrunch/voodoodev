
module.exports = function(config) {

	var router 	= config.router;
	var auth	= config.auth;

	var Assignment	= config.Assignment;


	router.post('/assignments/:assignment/join', auth, function(req, res, next) {

		var userId = req.payload.id;

		Assignment.findById(req.params.assignment, function(err, assignment) {
			assignment.users.push(userId);
			assignment.save(function(err, assignment) {
				if(err) {
					console.log("Could not save: " + err);
				}
				else{
					res.json(assignment);
				}	
			});
		});

	});


	router.put('/assignments/:assignment/joined', auth, function(req, res, next) {
		var userId = req.payload.id;
		var index;

		Assignment.findById(req.params.assignment, function(err, assignment) {
                	assignment.joinedUsers.push(userId);
			index = assignment.users.indexOf(userId);
			assignment.users.splice(index,1);
		
                	assignment.save(function(err, assignment) {
                        	if(err) {
                                	console.log("Could not save: " + err);
                        	}	
                        	else{
                                	res.json();
                        	}
                	});
        	});

		res.json();

	});


	router.post('/get_pending_assignments', auth, function(req, res, next) {

	
		var userId = req.payload.id;

		Assignment.find({users: userId}, function(err, assignments){
			if(err) {
				console.log(err);
			}
			else {
			
				// TODO : need to filter out/return the assignments that do not have
				// user id in their joined user array

				res.json(assignments);
				//res.json(assignments);
			}
		}); 

	});


};  // end of assignments
