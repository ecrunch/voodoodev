
var app = angular.module('taskDirective', []);


app.directive('task', function() {
	return {
		restrict: 'E',
		templateUrl: '../../temps/directive_partials/taskDirective.html'
	}
});


