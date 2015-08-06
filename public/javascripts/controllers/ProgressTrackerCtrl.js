var app = angular.module('ProgressTrackerCtrl',[]);

app.controller('ProgressTrackerCtrl', [
'$scope', 'progressTracker','auth',
function($scope, progressTracker, auth){

        $scope.user = auth.currentUser;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.progressTrackers = progressTracker.progressTrackers ;

        $scope.addTask = function() {
                if ($scope.title === '') {
                        return;
                }
                progressTracker.create({
                        description: $scope.newTaskDescription,
                        dueDate: $scope.newTaskDueDate,
                        type:   $scope.newTaskType
                });
                $scope.newTaskDescription = '';
                $scope.newTaskDueDate = '';
                $scope.newTaskType = '';
        };

}]);
