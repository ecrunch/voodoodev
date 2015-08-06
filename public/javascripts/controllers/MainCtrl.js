

var app = angular.module('MainCtrl', ['ui.bootstrap']);

/*
*	Runs on app init
*/

app.controller('MainCtrl', [

'$scope',  '$location', 'breathers','progressTracker', 'Session', 

function($scope, $location, breathers, progressTracker, Session){ 

	$scope.progressTrackers = [];
	$scope.breathers = [];
	$scope.progressTrackerIds = [];
	$scope.breatherIds = [];

	$scope.initialized = false;

	$scope.initializeSession = function() {
		Session.initializeEverything().then(
			function() {
				console.log("Initializing user");
				$scope.progressTrackers 		= Session.progressTrackers;
				$scope.breathers 	= Session.breathers;
				$scope.progressTrackerIds 		= Session.progressTrackerIds;
				$scope.breatherIds	= Session.breatherIds;


				var seen = {};
				// TODO : We should not be passing dupes to the front end
				$scope.progressTrackers = $scope.progressTrackers.filter(function(d) {
					if (! seen[d._id]) {
						seen[d._id] = d;
						return true;
					}
					else {
						return false;
					}
				});
                console.log($scope.progressTrackers);
				$scope.breathers = $scope.breathers.filter(function(d) {
					if (! seen[d._id]) {
						seen[d._id] = d;
						return true;
					}
					else {
						return false;
					}
				});
	
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


