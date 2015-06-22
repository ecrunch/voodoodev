var app = angular.module('taskListDirective',[]);

app.controller('taskListCtrl', [
'$scope', 'Task','auth','breathers', 'courses',
function($scope, Task, auth, breathers, courses) {
	
	$scope.user = auth.currentUser;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.tasks = Task.tasks ;
	$scope.breathers = breathers.breathers;
	$scope.courses = courses.courses;
	
	$scope.addTask = function() {
		console.log('Here');
                if ($scope.newTaskDescription === '') {
                        return;
                }
                Task.create({
                        description: $scope.newTaskDescription,
                        dueDate: $scope.newTaskDueDate,
                        type:   $scope.newTaskType
                });
                $scope.newTaskDescription = '';
                $scope.newTaskDueDate = '';
                $scope.newTaskType = '';
        };
}]);	

app.directive('taskList', function() {
	return{
		restrict: 'EA',
		scope: {
			tasks: '=',
			breathers: '=',
			courses: '=',
			statustype: '=',
			addtask: '='
		},
		templateUrl: 'temps/directive_partials/taskListDirective.html',
		link : function(scope, element, attrs) {
			console.log(scope.tasks);
		}
	};
});


	 
