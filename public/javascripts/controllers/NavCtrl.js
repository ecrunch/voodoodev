var app = angular.module('NavCtrl',[]);


app.controller('NavCtrl',
['$scope', 'auth','$state',
function($scope, auth, $state){
	

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
                        $scope.Pcount   = (Object.keys($scope.progressTrackers).length);
                        $scope.Bcount	= (Object.keys($scope.breathers).length);
		}
	});
	
	$scope.clickItems = function() {
		$scope.itenMenuStatus = true;
	};
	
	$scope.closeItems = function() {
                $scope.itenMenuStatus = false; 
        };	
	

}]);



