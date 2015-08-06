var app = angular.module('taskListDirective',[]);

app.controller('taskListCtrl', [
'$scope', 'Task','auth','breathers', 
function($scope, Task, auth, breathers) {
	
	$scope.user = auth.currentUser;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.tasks = Task.tasks ;
	$scope.breathers = breathers.breathers;
	
}]);	

app.directive('taskList', function() {
	return{
		restrict: 'EA',
		scope: {
			tasks: '=',
			breathers: '=',
			statustype: '=',
		},
		templateUrl: 'temps/directive_partials/taskListDirective.html',
		link : function(scope, element, attrs) {
		}
	};
});


	 
