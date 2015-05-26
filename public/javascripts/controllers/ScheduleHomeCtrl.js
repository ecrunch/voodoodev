var app = angular.module('ScheduleHomeCtrl', []);

app.controller('ScheduleHomeCtrl', [
	'$scope','Schedule',
	function($scope,Schedule) {

		$scope.chosenTasks = [];
		$scope.chosenBreathers = [];
		$scope.chosenTasksNames = [];
                $scope.chosenBreathersNames = [];
	
		$scope.addRemoveTask = function(item) {
			
	
			if ($scope.chosenTasks.indexOf(item) >= 0) {
				$scope.chosenTasks = $scope.chosenTasks.filter(function(d) { return d != item;});	
			}
			else {
				$scope.chosenTasks.push(item._id);
				$scope.chosenTasksNames.push(item.description)
			}
		};
		
		$scope.addRemoveBreather = function(item) {
			$scope.chosenBreathersNames.push(item.title);
                        if ($scope.chosenBreathers.indexOf(item) >= 0) {
                                $scope.chosenBreathers = $scope.chosenBreathers.filter(function(d) { return d != item;});
                        }
                        else {
                                $scope.chosenBreathers.push(item._id);
        		}	       
		};	

			
	var time;	
	var tasks = [];
	var breathers = [];
	
	$scope.createMadeSchedule = function(){
		
		tasks = $scope.chosenTasks;
		console.log(tasks);
		breathers = $scope.chosenBreathers;
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
