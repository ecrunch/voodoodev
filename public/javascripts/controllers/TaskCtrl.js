var app = angular.module('TaskCtrl',[]);

app.controller('TaskMainCtrl', [
'$scope', 'Task','auth',
function($scope, Task, auth){

        $scope.user = auth.currentUser;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.tasks = Task.tasks ;

        $scope.addTask = function() {
                if ($scope.title === '') {
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

        $scope.incrementUpvotes = function(task) {
                Task.upvote(task);
        };

        $scope.joinT = function(task){
                Task.joinTask(task);
        };
}]);
