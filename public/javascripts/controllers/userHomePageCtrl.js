var app = angular.module('userHomePageCtrl', []);

app.controller('userHomePageCtrl', [
'$scope', 'auth', 'progressTracker', '$location',
function($scope, auth, progressTracker, $location) {


	$scope.newSchedule = function() {
		$location.path('/schedule');	
	};



}]);


