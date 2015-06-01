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

	$scope.$watch('initialized', function(val) {
		console.log('user initialized: ' + val);
		if (val) {
                        $scope.Tcount   = (Object.keys($scope.tasks).length);
                        $scope.Ccount   = (Object.keys($scope.courses).length);
                        $scope.Bcount	= (Object.keys($scope.breathers).length);
		}
	});
	
	$scope.clickItems = function() {
		$scope.itenMenuStatus = true;
	};
	
	$scope.closeItems = function() {
                $scope.itenMenuStatus = false; 
        };	
	
	$scope.pendingAssignments = [];
	
	        $scope.getPendingAssignments = function() {
                return courses.getPendingAssignments();
        };

        $scope.joined = function(assId){
		courses.joined(assId);
	};

        $scope.joinAssignment = function(pending) {
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



