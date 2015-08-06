var app = angular.module('ScheduleCtrl',['angularMoment']);


app.controller('ScheduleCtrl', [
'$scope', '$stateParams', 'Schedule', '$interval','progressTracker',
function($scope, $stateParams, Schedule, $interval, progressTracker) {
 
	var DEFAULT_HOURS = 4;

	var SELECT_HOURS = 0;
	var BEGIN_SCHEDULE = 1;
	var SCHEDULE_RUNNING = 2;
	var SCHEDULE_PAUSED = 3;
	var currentIndex = 0;
    var stop;
	
	$scope.scheduleStatus = "AUTO";
	$scope.items = [];	
	$scope.timerStatus = SELECT_HOURS;
	$scope.skippedTasks = [];
	$scope.skippedTaskStatus = false;
	$scope.scheduleMade = false;
    $scope.chosenTasks = [];
    $scope.chosenBreathers = [];
    $scope.checkedItems = {};
    $scope.everythingChecked = true;
	$scope.userTime;
	$scope.scheduleCreated = false;
	$scope.chosenItem = null;


	$scope.init = function() {
		
		$scope.chosenTasks = [];
		$scope.chosenBreathers = [];
		$scope.checkedItems = {};
		
		$scope.progressTrackers.forEach(function(d) {
			$scope.checkedItems[d._id] = true;
			$scope.chosenTasks.push(d);
		});
		$scope.breathers.forEach(function(d) {
			$scope.checkedItems[d._id] = true;
			$scope.chosenBreathers.push(d);
		});
		
		$scope.scheduleStatus = "AUTO";
		$scope.items = [];
		$scope.timerStatus = SELECT_HOURS;
		$scope.skippedTasks = [];
		$scope.skippedTaskStatus = false;
		$scope.scheduleMade = false;
		$scope.everythingChecked = true;
	};

	$scope.skipTask = function(index) {
		
		$scope.skippedTaskStatus = true;
		var skipped = $scope.items[index];

		$scope.skippedTasks.push(skipped);
		$scope.removeItem(index);
	};
	
	$scope.scheduleMake = function(){
                $scope.scheduleStatus= "CUSTOM_SCHEDULE";
        }
	
	$scope.createSchedule = function(){
        console.log("in controller")
		$scope.createCustomSchedule();
	};
	
	$scope.resetSchedule = function() {
		$scope.items = [];
	};
	
	$scope.removeItem = function(slot) {
		console.log("Removing at slot: " + slot);
		$scope.items.splice(slot, 1);
		$scope.chosenItem = $scope.items[0] || null;
	};


	// TODO : are we implenting this?
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

        };
	
	 $scope.addRemoveTask = function(item) {

                if ($scope.checkedItems[item._id]) {
                        $scope.checkedItems[item._id] = false;
                        $scope.chosenTasks = $scope.chosenTasks.filter(function(d) {
				return d._id != item._id;
			});
                }
                else {
                        $scope.checkedItems[item._id] = true;
                        $scope.chosenTasks.push(item);
                }


        };

        $scope.addRemoveBreather = function(item) {

                if ($scope.checkedItems[item._id]) {
                        $scope.checkedItems[item._id] = false;
                        $scope.chosenBreathers = $scope.chosenBreathers.filter(function(d) { 
				return d._id != item._id;
			});
                }
                else {
                        $scope.checkedItems[item._id] = true;
                        $scope.chosenBreathers.push(item);
                }
        };
		
	function validateTime(input) {

		// TODO : check against letters and other non number shit

		if (input == null || input == "") {
			console.log("Bad input, using default time of " + DEFAULT_HOURS + " hours");
			return false;
		}
		else {
			return true;
		}
	}

	$scope.setTimerStatus = function(code) {
		$scope.timerStatus = code;	
	};

        $scope.createCustomSchedule = function(){

                if ($scope.chosenTasks.length == 0) {
                        alert("add some tasks");
                        return;
                }
                if ($scope.chosenBreathers.length == 0) {
                        alert("add some breathers");
                        return;
                }

                var progressTrackers = [];
                var breathers = [];

                $scope.chosenTasks.forEach(function(d) {
                        progressTrackers.push(d._id);
                });
                $scope.chosenBreathers.forEach(function(d) {
                        breathers.push(d._id);
                });

		var numHours = validateTime($scope.userTime) ? $scope.userTime : DEFAULT_HOURS;

                Schedule.createMade(numHours, progressTrackers, breathers).then(
                        function(data) {
                                $scope.items = data.data;
                                $scope.timeLabel = $scope.userTime;
				$scope.timerStatus = BEGIN_SCHEDULE;
                                $scope.scheduleMade = true;
				$scope.scheduleCreated = true;
				$scope.chosenItem = $scope.items[0];
                        },
                        function(err) {
                                console.log(err);
                        }
                );

        };  // end of create made func
	

	// wait for the tasks/breathers to be loaded in
	// TODO : we should do this by broadcasting events rather than
	// watching a variable
	$scope.$watch('initialized', function(val) {
		if(val) {
			$scope.init();
		}
	});

}]);
