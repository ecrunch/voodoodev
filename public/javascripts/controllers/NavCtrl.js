var app = angular.module('NavCtrl',[]);


app.controller('NavCtrl',
['$scope', 'auth','$state', 'courses','Task',
function($scope, auth, $state, courses, Task){
	
	
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = function(){
                auth.logOut();
                $state.go('login');
		document.location.reload(true);

        };
	
	$scope.pendingAssignments = [];
	
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



