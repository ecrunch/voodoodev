var app = angular.module('SideNavCtrl',[]);


app.controller('SideNavCtrl',
['$scope', 'auth','$state','User',
function($scope, auth, $state, User){

	User.initializeTasks().then(
                // success
                function(data) {
                        $scope.tasks    = User.tasks;
                        $scope.taskIds  = User.taskIds;
                },
                // failure
                function(err) {
                        console.log(err);
                }
        );
	User.initializeCourses().then(
                // success
                function(data) {
                        $scope.courses          = User.courses;
                        $scope.courseIds        = User.courseIds;
                },
                // failure
                function(err) {
                        console.log(err);
                }
        );
	User.initializeBreathers().then(
                // success
                function(data) {
                        $scope.breathers        = User.breathers;
                        $scope.breatherIds      = User.breatherIds;
                },
                // failure
                function(err) {
                        console.log(err);
                }
        );

}]);
