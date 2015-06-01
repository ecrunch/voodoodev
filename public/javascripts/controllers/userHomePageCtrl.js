var app = angular.module('userHomePageCtrl', []);

app.controller('userHomePageCtrl', [
'$scope', 'auth', 'Task', 'courses', '$location',
function($scope, auth, Task, courses, $location) {

        $scope.pendingAssignments = [];

	$scope.newSchedule = function() {
		$location.path('/schedule');	
	};


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


