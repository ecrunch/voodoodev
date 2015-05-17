

module.exports = function(router, Breather, auth, Link, User) {

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
			}
			res.json(breather);
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

			user.joinBreather(breatherId);

			user.save(function(err, userRet) {
				if (err) {
					console.log("Error Saving");
					return next(err);
				}
				res.json(userRet);
			});

		});

	});

} // end of breathers module
