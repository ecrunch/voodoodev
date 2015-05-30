var app = angular.module('ScheduleHomeCtrl', []);

app.controller('ScheduleHomeCtrl', [
	'$scope','Schedule',
	function($scope,Schedule) {

		$scope.chosenTasks = [];
		$scope.chosenBreathers = [];
	
		$scope.addRemoveTask = function(item) {
				
			if ($scope.chosenTasks.indexOf(item) >= 0) {
				$scope.chosenTasks = $scope.chosenTasks.filter(function(d) { return d != item;});	
			}
			else {
				$scope.chosenTasks.push(item);
			}
			$scope.reportStatus();
		};
		
		$scope.addRemoveBreather = function(item) {
                        
			if ($scope.chosenBreathers.indexOf(item) >= 0) {
                                $scope.chosenBreathers = $scope.chosenBreathers.filter(function(d) { return d != item;});
                        }
                        else {
                                $scope.chosenBreathers.push(item);
        		}	       
		};	


			
	var time;	
	var tasks = [];
	var breathers = [];
	
	$scope.createMadeSchedule = function(){

		var tasks = [];
		var breathers = [];

		$scope.chosenTasks.forEach(function(d) {
			tasks.push(d._id);
		});
		$scope.chosenBreathers.forEach(function(d) {
			breathers.push(d._id);
		});
	
		time = $scope.time; 
		
		Schedule.createMade(time, tasks, breathers).then(
			function(data) {
				
				$scope.items = data.data;
				
			},
			function(err) {
				console.log(err);
			}
		);		

	 };
}]);
