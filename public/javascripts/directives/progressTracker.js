
var app = angular.module('progressTrackerDirective', []);


app.directive('progressTracker', function() {
	return {
		restrict: 'E',
		templateUrl: '../../temps/directive_partials/progressTrackerDirective.html'
	}
});


