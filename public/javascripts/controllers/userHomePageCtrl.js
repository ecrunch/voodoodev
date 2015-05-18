var app = angular.module('userHomePageCtrl', []);

app.controller('userHomePageCtrl', [
'$scope', 'auth', 'User','Task','courses',
function($scope, auth, User, Task, courses) {

        $scope.loadAll = true;
        //$scope.loadAll = false;

        $scope.tasks = [];

        $scope.pendingAssignments = [];


	User.initializeTasks().then(
		// success
		function(data) {
			$scope.tasks 	= User.tasks;
			$scope.taskIds 	= User.taskIds;
		},
		// failure
		function(err) {
			console.log(err);
		}
	);
	User.initializeBreathers().then(
		// success
		function(data) {
			$scope.breathers 	= User.breathers;
			$scope.breatherIds 	= User.breatherIds;
		},
		// failure
		function(err) {
			console.log(err);
		}
	);
	User.initializeCourses().then(
		// success
		function(data) {
			$scope.courses 		= User.courses;
			$scope.courseIds 	= User.courseIds;
		},
		// failure
		function(err) {
			console.log(err);
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


	// only do this once the other shit is loaded? regardless, need to refactor
        $scope.getPendingAssignments().then(
        	// success
                function(data) {
                	$scope.pendings = data.data;
                        $scope.pendingAssignments = data;
                },
                // error
                function() {
                	console.log("Controller: Error loading pending assignments");
               	}
	);


}]);


