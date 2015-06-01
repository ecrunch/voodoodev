var app = angular.module('ScheduleHomeCtrl', []);

/*
*	TODO : I think we are assuming the existence of tasks/breathers
*	here, need to make some methods to grab them
*/

app.controller('ScheduleHomeCtrl', [
	'$scope','Schedule',
	function($scope,Schedule) {

		$scope.scheduleMade = false;
		$scope.chosenTasks = [];
		$scope.chosenBreathers = [];


		$scope.checkedItems = {};
		$scope.everythingChecked = false;
	
		$scope.tasks.forEach(function(d) {
			$scope.checkedItems[d.description] = false;
		});
		$scope.breathers.forEach(function(d) {
			$scope.checkedItems[d.title] = false;
		});


		$scope.addRemoveAll = function() {

			if ($scope.everythingChecked) {
				for (var key in $scope.checkedItems) {
					$scope.checkedItems[key] = false;
					$scope.everythingChecked = false;
				}
				$scope.chosenTasks = [];
				$scope.choseBreathers = [];
			}
			else {
				for (var key in $scope.checkedItems) {
					$scope.checkedItems[key] = true;
					$scope.everythingChecked = true;
				}
				$scope.tasks.forEach(function(d) {
					$scope.chosenTasks.push[d];
				});	
				$scope.breathers.forEach(function(d) {
					$scope.chosenBreathers.push[d];
				});	
			}
			return;

		}

	
		$scope.addRemoveTask = function(item) {
				
			if ($scope.checkedItems[item.description]) {
				$scope.checkedItems[item.description] = false;
				$scope.chosenTasks = $scope.chosenTasks.filter(function(d) { return d != item;});	
			}
			else {
				$scope.checkedItems[item.description] = true;
				$scope.chosenTasks.push(item);
			}
		};
		
		$scope.addRemoveBreather = function(item) {
                        
			if ($scope.checkedItems[item.title]) {
				$scope.checkedItems[item.title] = false;
                                $scope.chosenBreathers = $scope.chosenBreathers.filter(function(d) { return d != item;});
                        }
                        else {
				$scope.checkedItems[item.title] = true;
                                $scope.chosenBreathers.push(item);
        		}	       
		};	

			
	var time;	
	var tasks = [];
	var breathers = [];
	
	$scope.createMadeSchedule = function(){

		if ($scope.chosenTasks.length == 0) {
			alert("add some tasks");
			return;
		}
		if ($scope.chosenBreathers.length == 0) {
			alert("add some breathers");
			return;
		}

		var tasks = [];
		var breathers = [];


		$scope.chosenTasks.forEach(function(d) {
			tasks.push(d._id);
		});
		$scope.chosenBreathers.forEach(function(d) {
			breathers.push(d._id);
		});


		$scope.time ? $scope.time = $scope.time : $scope.time = 4;	
		time = $scope.time;		

		Schedule.createMade(time, tasks, breathers).then(
			function(data) {	
				$scope.items = data.data;
				$scope.timeLabel = $scope.time;
				$scope.scheduleMade = true;
			},
			function(err) {
				console.log(err);
			}
		);		

	 };
}]);
