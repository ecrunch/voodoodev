
var app = angular.module('sessionService', []);

app.factory('Session', [

'$http', 'auth',

function($http, auth) {

	var service = {
		tasks: 		[],
		taskIds:	[],
		courses: 	[],
		courseIds:	[],
		breathers: 	[],
		breatherIds:	[]
	};


	// TODO : make a route function that grabs everything
	service.initializeEverything = function() {
		return service.initializeTasks().then(function() {
			return service.initializeBreathers().then(function() {
				return service.initializeCourses().then(function() {
					return;
				});
			});
		});
	};


	service.initializeTasks = function() {
		return $http.post('/user/tasks/', null, {
			headers: {
				Authorization: 'Bearer ' + auth.getToken()
			}
		})
		.then(	
			// success
			function(data) {
				service.tasks 	= data.data.tasks;
				service.taskIds = data.data.taskIds;
				return data;
			},
			//fail
			function(err) {
				console.log(err);
				return;
			}
		);
	};

	service.initializeBreathers = function() {
		return $http.post('/user/breathers/', null, {
			headers: {
				Authorization: 'Bearer ' + auth.getToken()
			}
		})
		.then(	
			// success
			function(data) {
				service.breathers = data.data.breathers;
				service.breatherIds = data.data.breatherIds;
				return data;
			},
			//fail
			function(err) {
				console.log(err);
				return;
			}
		);
	};

	service.initializeCourses = function() {
		return $http.post('/user/courses/', null, {
			headers: {
				Authorization: 'Bearer ' + auth.getToken()
			}
		})
		.then(	
			// success
			function(data) {
				service.courses = data.data.courses;
				service.courseIds = data.data.courseIds;
				return data;
			},
			//fail
			function(err) {
				console.log(err);
				return;
			}
		);
	};



	return service;

}]);
