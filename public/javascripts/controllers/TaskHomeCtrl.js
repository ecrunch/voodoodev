
var app = angular.module('TaskHomeCtrl', []);

app.controller('TaskHomeCtrl', [
'$scope',
function($scope) {

	$scope.selectedTask = null;

	$scope.makeSelected = function(task) {
		$scope.selectedTask = task;
	};

}]);

