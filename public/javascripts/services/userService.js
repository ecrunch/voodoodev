
var app = angular.module('userService',[]);


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

	user.initializeTasks = function() {
	
		return $http.post('/user/tasks', null, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
		})
		.then(
			// success
			function(data) {
				console.log(data);
				console.log('task success');
				user.taskIds = data.data.taskIds;
				user.tasks   = data.data.tasks;
			},
			// failue
			function(err) {
				console.log('task fail');
				console.log(err);
			}
		);
	};

	user.initializeBreathers = function() {
		
		return $http.post('/user/breathers', null, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
		})
		.then(
			// success
			function(data) {
				console.log('breather success');
				user.breatherIds = data.data.breatherIds;
				user.breathers   = data.data.breathers;
			},
			// failue
			function(err) {
				console.log('breather fail');
				console.log(err);
			}
		);

	};

	user.initializeCourses = function() {
		
		return $http.post('/user/courses', null, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
		})
		.then(
			// success
			function(data) {
				console.log('course success');
				user.courseIds = data.data.courseIds;
				user.courses   = data.data.courses;
			},
			// failue
			function(err) {
				console.log('course fail');
				console.log(err);
			}
		);

	};

        return user;

}]);

