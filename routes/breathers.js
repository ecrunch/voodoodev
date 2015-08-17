

module.exports = function(config) {


	// TODO : error handling
	var router 	= config.router;
	var auth 	= config.auth;

	var Breather 	= config.Breather;
	var User 	= config.User;
	var Link 	= config.Link;


	router.get('/breathers', function(req, res, next) {
		Breather.find(function(err, breathers){
    			if(err){
				return next(err);
			}
			res.json(breathers);
  		});
	});


	router.get('/breathers/:breather', function(req, res) {
		req.breather.populate('comments links', function(err, breather) {
			res.json(req.breather);
        	});
	});


	router.post('/breathers', auth, function(req, res, next) {

		var userId = req.payload.id;
		req.body.userId = userId;

		var breather = new Breather(req.body);

		breather.save(function(err, task) {
			if(err) {
				return next(err);
			} else {
                User.findById(userId, function(err, user) {
                user.joinBreather(breather._id);
                    user.save(function(err, user) {
                        if(err) {
                            console.log(err);
                        } else {
			                res.json(breather);
		                }
                        
                    });
                });
            }  
        });            
	});


	router.param('breather', function(req, res, next, id) {

		var query = Breather.findById(id);
		query.exec(function (err, breather){
			if (err) {
				return next(err);
			}
			if (!breather) {
				return next(new Error('can\'t find breather'));
			}
			req.breather = breather;
			return next();
		});
	});

	router.post('/breathers/:breather/links', auth, function(req, res, next) {
        	var link = new Link(req.body);
        	link.breather = req.breather;
        	link.author = req.payload.username;
        	link.save(function(err, link){
                if(err){
                        return next(err);
                }
                req.breather.links.push(link);
                req.breather.save(function(err, breather) {
                    if(err){
                        return next(err);
                    }
                    res.json(link);
                });
        	});
	});


	router.put('/breathers/:breather/upvote', auth, function(req, res, next) {
		req.breather.upvote(function(err, breather){
			if (err) {
				return next(err);
			}
			res.json(breather);
		});
	});



	router.post('/breathers/:breather/joinBreather', auth, function(req, res, next) {
		
		var breatherId;

		User.findById(req.payload.id, function(err, user) {
		
			if(err) {
				// do whatever
				console.log(err);
			}


			breatherId = req.params.breather;


			if(user.myBreathers.indexOf(breatherId) >= 0) {
				console.log("Already have this breather");
				res.json(user);
			}
			else {
				user.joinBreather(breatherId);

				user.save(function(err, user) {
					if (err) {
						console.log("Error Saving");
						return next(err);
					}
					res.json(user);
				});
			}

		});

	});

} // end of breathers module
