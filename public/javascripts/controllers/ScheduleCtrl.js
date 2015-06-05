var app = angular.module('ScheduleCtrl',['angularMoment']);


app.controller('ScheduleCtrl', [
'$scope', '$stateParams', 'Schedule', '$interval',
function($scope, $stateParams, Schedule, $interval) {
        
	var defaultHours = 4;

	function validateTime(input) {

		// TODO : check against letters and other non number shit

		if (input == null || input == "") {
			console.log("Bad input, using default time of " + defaultHours + " hours");
			return false;
		}
		else {
			return true;
		}
	}

	var currentIndex = 0;
        var stop;


	$scope.items = [];	
 
	var SELECT_HOURS = 0;
	var BEGIN_SCHEDULE = 1;
	var SCHEDULE_RUNNING = 2;
	var SCHEDULE_PAUSED = 3;


	$scope.timerStatus = SELECT_HOURS;

	$scope.skippedTasks = [];
	$scope.skippedTaskStatus = false;


	$scope.resetSchedule = function() {
		$scope.items = [];
	}


	$scope.newSchedule = function() {

		$scope.resetSchedule();
		var numHours = validateTime($scope.userTime) ? $scope.userTime : defaultHours;
		
		Schedule.createNew(numHours).then(
			function(data) {
				
				$scope.items = data.data;
				
				currentIndex 			= 0;
				$scope.timeLeft 		= 0;
				$scope.timerStatus 		= BEGIN_SCHEDULE;
				$scope.skippedTaskStatus 	= false;
														
			},
			function(err) {
				console.log(err);
			}
		);
	}
	
	$scope.remoteItem = function(slot) {
		console.log("Removing at slot: " + slot);
		$scope.items.splice(slot, 1);
	};


        $scope.storeTime = function(){
                id =  $scope.id;
                trackedTime = (($scope.totalTime-$scope.timeLeft)/60000);
                Schedule.storeTime(id, trackedTime);

        };


        $scope.startTimer = function(){
        	//prevents it going to the next item if it is already going and not done
		if ( angular.isDefined(stop) ) return;        	
		$scope.pass();
        };

        $scope.pass = function(){
                var item 		= $scope.items[currentIndex];
		var timeLeft 		= (item.minutes)*60000;
                $scope.timeLeft 	= timeLeft;
                $scope.totalTime 	= timeLeft;
                $scope.timerStatus	= SCHEDULE_RUNNING;
                $scope.display 		= item.details.description;
                $scope.id 		= item.details.id;
                $scope.timer(); 
	};



        $scope.timer = function(){
        	
		stop = $interval(function() {
                	if ($scope.timeLeft > 0) {
                        	$scope.timerTimes = moment.duration($scope.timeLeft).seconds();
                        	$scope.timerTimem = moment.duration($scope.timeLeft).minutes();
                        	$scope.timeLeft = $scope.timeLeft - 1000;
                	} else {
				$scope.storeTime();
				$scope.removeItem(currentIndex);
                        	$scope.timerStatus = SCHEDULE_PAUSED;
                        	$scope.stopTimer();
                	}
        	}, 1000);

        };

        $scope.stopTimer = function() {
		console.log("Stopping timer");
                if (angular.isDefined(stop)) {
                        $scope.timerStatus = SCHEDULE_PAUSED;
			$interval.cancel(stop);
                        stop = undefined;
                }
        };

        $scope.resumeTimer = function(){
		console.log("Starting timer");
                $scope.timerStatus = SCHEDULE_RUNNING;
		$scope.timer();
        };

        $scope.skipTimer = function(){
		
		$scope.skippedTaskStatus = true;
                $scope.stopTimer();
                $scope.storeTime();
		$scope.display='';
                $scope.timeLeft ='';
                $scope.timerStatus = SCHEDULE_RUNNING;

		// TODO : figure out how to do minutes worked on
		var skipped = $scope.items[currentIndex];
		$scope.skippedTasks.push(skipped);
		
		$scope.remoteItem(currentIndex);
		$scope.startTimer();   // TODO : should be resume but had to make it work
		
        };

        $scope.$on('$destroy', function() {
		// Make sure that the interval is destroyed too
		$scope.stopTimer();
	});


}]);
