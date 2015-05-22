var app = angular.module('SideNavCtrl',[]);


app.controller('SideNavCtrl',
['$scope', 'auth','$state','User','courses','Task',
function($scope, auth, $state, User, courses, Task){
	
	$scope.pendingAssignments = [];
	
	User.initializeTasks().then(
                // success
                function(data) {
                        $scope.tasks    = User.tasks;
                        $scope.taskIds  = User.taskIds;
                	$scope.Tcount	= (Object.keys($scope.tasks).length);
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
			$scope.Ccount   = (Object.keys($scope.courses).length);
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
			$scope.Bcount   	= (Object.keys($scope.breathers).length);
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

        $scope.joinAssignment = function(pending) {
                console.log('called');
		Task.create({
                        description:    pending.name,
                        dueDate:        pending.dueDate,
                        type:           pending.type
                });
		location.reload();
		$scope.Pcount =(Object.keys($scope.pendings).length);
                $scope.joined(pending._id);
        };


        // only do this once the other shit is loaded? regardless, need to refactor
        $scope.getPendingAssignments().then(
                // success
                function(data) {
                        $scope.pendings = data.data;
                        $scope.pendingAssignments = data;
			console.log($scope.pendings); 
               		$scope.Pcount =(Object.keys($scope.pendings).length);
		},
                // error
                function() {
                        console.log("Controller: Error loading pending assignments");
                }
        );
}]);
