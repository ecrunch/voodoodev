var app = angular.module('ScheduleHomeCtrl', []);

app.controller('ScheduleHomeCtrl', [
	'$scope',
	function($scope) {


		console.log("Hey");

		$scope.chosenItems = [];

		$scope.addRemove = function(item) {
			
			console.log(item);
	
			if ($scope.chosenItems.indexOf(item) >= 0) {
				$scope.chosenItems = $scope.choseItems.filter(function(d) { return d != item;});	
			}
			else {
				$scope.chosenItems.push(item);
			}
		}

	}
]);
