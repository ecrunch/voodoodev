var app = angular.module('courseServices',[]);



app.factory('auth', ['$http', '$window', function($http, $window){
	var auth = {};

	auth.saveToken = function (token){
		$window.localStorage['flapper-news-token'] = token;
	};

	auth.getToken = function (){
		return $window.localStorage['flapper-news-token'];
	};

	auth.isLoggedIn = function(){
  		var token = auth.getToken();

		if(token){
    			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		}
		else {
			return false;
		}
	};

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
    			var token = auth.getToken();
    			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.username;
  		}
	};

	auth.register = function(user){
  		return $http.post('/register', user).success(function(data){
    			auth.saveToken(data.token);
  		});
	};

	auth.logIn = function(user){
  		return $http.post('/login', user).success(function(data){
    			auth.saveToken(data.token);
  		});
	};

	auth.logOut = function(){
  		$window.localStorage.removeItem('flapper-news-token');
	};

  	return auth;
}]);


app.factory('Task',['$http', 'auth', function($http, auth){

	var service = {
		tasks:[]
	};
          
	service.getAll = function() { 
		return $http.get('/tasks').success(
			function(data){
				angular.copy(data, service.tasks);
			}
		);
	};
        
	service.get = function(id) {
		return $http.get('/tasks/' + id).then(
			function(res){
				return res.data;
			}
		);
	};
        
	service.create = function(task) {
		return $http.post('/tasks', task, {
			headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		}).success(
			function(data){
				service.tasks.push(data);
			}
		);
	};

	service.addComment = function(id, comment) {
		return $http.post('/tasks/' + id + '/comments', comment, {
			headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		});
	};

	service.addSubTask = function(id, subTask) {
		return $http.post('/tasks/' + id + '/subTasks', subTask, {
			headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		});                                                                                 
	};

	service.upvote = function(task) {
		return $http.put('/tasks/' + task._id + '/upvote', null, {
			headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		}).success(
			function(data){
				task.upvotes += 1;
			}
		);
	};

	service.upvoteComment = function(task, comment) {
		return $http.put('/tasks/' + task._id + '/comments/'+ comment._id + '/upvote', null, {
			headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		}).success(
			function(data){
				comment.upvotes += 1;
			}
		);
	};
    
	service.joinTask = function(task) {
		return $http.post('/tasks/'+ task._id+'/joinTask',null, {
			headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		}).then(
			//success
			function(data) {
			},
			//failure
			function() {
				console.log("Error");
			}
		);
	
	};

	return service;
    
}]); 


app.factory('User', [
'$http',
'auth',
function($http, auth) {

	var user = {
		
		breatherIds: [

		],
	
		breathers: [

		],
		courseIds: [

                ],

                courses: [

                ],
		taskIds: [

                ],

                tasks: [

                ]
	};

	user.initialize = function(loadAll) {

		return $http.post('/user', null, {
			headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		})
		.then(
			//success
			function(data) {	
				user.breatherIds = data.data.myBreathers;
				user.breathers = data.data.breathers;
				user.courseIds = data.data.myCourses;
                                user.courses = data.data.courses;
				user.taskIds = data.data.myTasks;
                                user.tasks = data.data.tasks;
			},
			//failuer
			function() {
				console.log("Error");
			}
		);
	};


	return user;

}]);


app.factory('Schedule', [
'$http',  
'auth',
function($http, auth){

	var service = {

		items: [


		]

	};

	service.storeTime = function(id, trackt){
		console.log("ID: " + id);
		console.log("TRACKT: " + trackt);
		return $http.put('/tasks/' + id + '/time/' + trackt, null, {
			headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		}).then(
			// success
			function(data) {
				return data;
			},
			// faiure
			function() {
				console.log("Could not store minutes");
			}
		);	
		
	};

	service.createNew = function() {

		return $http.post('/new_schedule', null, {
			headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		}).then(
			// success
			function(data){
				var items = data.data;
				for (var i = 0; i < items.length; i++) {
					service.items.push(items[i]);
				}
				console.log(service.items);
			},

			// failure
			function(){
				alert("Error creating schedule");
			}
		);
	};

	service.purge = function() {
		service.items = [];
	};

	service.save = function() {
		return;
	};

	return service;

}]);

app.factory('courses',['$http', 'auth', function($http, auth){

	var o = {
		courses:[]
	};
          
	o.getAll = function() { 
		return $http.get('/courses').success(function(data){
			angular.copy(data, o.courses);
		});
	};
        
	o.get = function(id) {
		return $http.get('/courses/' + id).then(function(res){
			return res.data;
		});
	};
        
	o.create = function(course) {
		return $http.post('/courses', course, {
		headers: {Authorization: 'Bearer '+auth.getToken()}
		}).success(function(data){
		o.courses.push(data);
	});

	};

	o.addComment = function(id, comment) {
		return $http.post('/courses/' + id + '/comments', comment, {
		headers: {Authorization: 'Bearer '+auth.getToken()}
		});
	};

	o.addPost = function(id, post) {
                return $http.post('/courses/' + id + '/posts', post, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                });
        };

	o.addAssignment = function(id, assignment) {
		return $http.post('/courses/' + id + '/assignments', assignment, {
		headers: {Authorization: 'Bearer '+auth.getToken()}
		});
	};

	o.upvote = function(course) {
		return $http.put('/courses/' + course._id + '/upvote', null, {
		headers: {Authorization: 'Bearer '+auth.getToken()}
		})
		.success(function(data){
		course.upvotes += 1;
		});
	};

	o.upvoteComment = function(course, comment) {
		return $http.put('/courses/' + course._id + '/comments/'+ comment._id + '/upvote', null, {
		headers: {Authorization: 'Bearer '+auth.getToken()}
		})
		.success(function(data){
			comment.upvotes += 1;
		});
	};

	o.joinCourse = function(course) {
		return $http.post('/courses/'+ course._id+'/joinCourse',null, {
		headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		})
		.then(
			//success
			function(data) {
			},
			//failure
			function() {
				console.log("Error");
			}
		);	
	};

	o.joinAssignment = function(assignment) {
		return $http.post('/assignments/' + assignment._id + '/join', null,
			{
				headers: {
					Authorization: 'Bearer ' + auth.getToken()
				}
			}
		)
		.then(
			// success
			function(data) {

			},
			// error
			function() {
				console.log("Error joining assignments");
			}
		);
	};

	o.getPendingAssignments = function() {
		return $http.post('/get_pending_assignments', null, 
			{
				headers: {
					Authorization: 'Bearer ' + auth.getToken()
				}
			}
		)
		.then(
			// success
			function(data) {
				return data;
			},
			//  error
			function() {
				console.log('Service: Error loading pending assignments');
			}
		);
	};

	return o;

}]);

app.factory('breathers',['$http', 'auth', function($http, auth){
var b = {
	breathers:[]
	};

	b.getAll = function() {
		return $http.get('/breathers').success(function(data){
		angular.copy(data, b.breathers);
		});
	};

	b.get = function(id) {
		return $http.get('/breathers/' + id).then(function(res){
			return res.data;
		});
	};

	
	b.create = function(breather) {
		return $http.post('/breathers', breather, {
		headers: {Authorization: 'Bearer '+auth.getToken()}
		}).success(function(data){
			b.breathers.push(data);
		});

	};

	b.upvote = function(breather) {
		return $http.put('/breathers/' + breather._id + '/upvote', null, {
		headers: {Authorization: 'Bearer '+auth.getToken()}
		})
		.success(function(data){
		breather.upvotes += 1;
		});
	};

	b.addLink = function(id, link) {
                return $http.post('/breathers/' + id + '/links', link, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                });
        };	

	b.joinBreather = function(breather) {
		
		return $http.post('/breathers/'+ breather._id+'/joinBreather',null, {
			headers: {
				Authorization: 'Bearer '+auth.getToken()
			}
		})
		.then(
			//success
			function(data) {
			},
			//failure
			function() {
				console.log("Error");
			}
		);

		/*	
		.success(function(data){
			b.breathers.push(data);
		});
		*/
	};
return b;
}]);
