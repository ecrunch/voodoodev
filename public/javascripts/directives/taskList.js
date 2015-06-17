var app = angular.module('taskListDirective',[]);

app.controller('taskListCtrl', [
'$scope', 'Task','auth',
function($scope, Task, auth) {
	
	$scope.user = auth.currentUser;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.tasks = Task.tasks ;
}]);	

app.directive('taskList', function() {
	return{
		restrict: 'EA',
		scope: {
			tasks: '='
		},
		template:"<ul><li ng-repeat='task in tasks'><a>{{task.description}}</a></li></ul>",
		link : function(scope, element, attrs) {
			console.log(scope.tasks);
		}
	};
});


	 
