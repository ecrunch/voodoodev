var app = angular.module('userHomePageCtrl', []);

app.controller('userHomePageCtrl', [
'$scope', 'auth', 'User','Task','courses',
function($scope, auth, User, Task, courses) {

        $scope.loadAll = true;
        //$scope.loadAll = false;

        $scope.tasks = [];

        $scope.pendingAssignments = [];

        User.initialize($scope.loadAll)
        .then(
                function() {
                        $scope.breatherIds = User.breatherIds;
                        $scope.breathers = User.breathers;
                        $scope.courseIds = User.courseIds;
                        $scope.courses = User.courses;
                        $scope.taskIds = User.breatherIds;
                        $scope.tasks = User.tasks;


                        // only do this once the other shit is loaded? regardless, need to refactor
                        $scope.getPendingAssignments()
                        .then(
                                // success
                                function(data) {
                                        $scope.pendings = data.data;
                                        //alert(data);
                                        $scope.pendingAssignments = data;
                                },
                                // error
                                function() {
                                        console.log("Controller: Error loading pending assignments");
                                }
                        );

                },
                function() {
                        console.log("Error loading user data");
                }
        );

        // returns a promise or some shit
        $scope.getPendingAssignments = function() {
                return courses.getPendingAssignments();
        };
        $scope.joined = function(assId){
                courses.joined(assId);
                };

        $scope.joinAssignment = function(assId) {
                Task.create({
                        description:    assId.name,
                        dueDate:        assId.dueDate,
                        type:           assId.type
                });

                $scope.joined(assId._id);
        };


}]);


