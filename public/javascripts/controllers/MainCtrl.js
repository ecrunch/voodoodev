

var app = angular.module('MainCtrl', ['ui.bootstrap']);



// parent global controller or whatever

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


	// SHOULD error handle on this	
	$scope.getSearchResults = function(val) {
		
		var results = [];

		$scope.courses
			.filter(function(d) {
				return d.title.toLowerCase().indexOf(val.toLowerCase()) >= 0;
			})
			.forEach(function(d) {
				results.push(
					{
						text: 'course: ' + d.title,
						title: d.title,
						url: '/courses/' + d._id
					}
				);
			});

		$scope.breathers
			.filter(function(d) {
				return d.title.toLowerCase().indexOf(val.toLowerCase()) >= 0;
			})
			.forEach(function(d) {
				results.push(
					{
						text: 'breather: ' + d.title,
						title: d.title,
						url: '/breathers/' + d._id
					}
				);
			});

		return results;

	};


	$scope.onSelect = function($item, $model, $label) {
		console.log($item.url);
		$location.path($item.url).replace();
	};


	// INIT
	$scope.initializeSession();

}]);


