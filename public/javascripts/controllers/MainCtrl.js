

var app = angular.module('MainCtrl', ['ui.bootstrap']);

/*
*	Runs on app init
*/

app.controller('MainCtrl', [

'$scope', 'courses',  '$location', 'breathers', 'Session', 

function($scope, courses, $location, breathers, Session){ 

	$scope.tasks = [];
	$scope.breathers = [];
	$scope.courses = [];
	$scope.tasksIds = [];
	$scope.breatherIds = [];
	$scope.courseIds = [];

	$scope.initialized = false;

	$scope.initializeSession = function() {
		Session.initializeEverything().then(
			function() {
				console.log("Initializing user");
				$scope.tasks 		= Session.tasks;
				$scope.breathers 	= Session.breathers;
				$scope.courses 		= Session.courses;
				$scope.taskIds 		= Session.taskIds;
				$scope.breatherIds	= Session.breatherIds;
				$scope.courseIds	= Session.courseIds;
				$scope.initialized	= true;
			},
			function(err) {
				console.log(err);
			}
		);
	};

	$scope.onSelect = function($item, $model, $label) {
		console.log($item.url);
		$location.path($item.url).replace();
	};


	// INIT
	$scope.initializeSession();

}]);


