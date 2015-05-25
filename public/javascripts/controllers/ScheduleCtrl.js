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


	$scope.items = [];	
 
	var CREATE_NEW_SCHEDULE = 0;
	var SCHEDULE_STARTED = 1;
	var SCHEDULE_STOPPED = 2;


	$scope.timerStatus = CREATE_NEW_SCHEDULE;

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
				$scope.timerStatus 		= SCHEDULE_STARTED;
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


        $scope.scheduleTimer = function(){
        	//prevents it going to the next item if it is already going and not done
		if ( angular.isDefined(stop) ) return;        	
		$scope.pass();
        };

        $scope.pass = function(){
                var item 		= $scope.items[currentIndex];
		var timeLeft 		= (item.minutes)*60000;
                $scope.timeLeft 	= timeLeft;
                $scope.totalTime 	= timeLeft;
                $scope.timerStatus	= SCHEDULE_STOPPED;
                $scope.display 		= item.details.description;
                $scope.id 		= item.details.id;
                $scope.timer(); 
	};


        var stop;

        $scope.timer = function(){
        	
		stop = $interval(function() {
                	if ($scope.timeLeft > 0) {
                        	$scope.timerTimes = moment.duration($scope.timeLeft).seconds();
                        	$scope.timerTimem = moment.duration($scope.timeLeft).minutes();
                        	$scope.timeLeft = $scope.timeLeft - 1000;
                	} else {
				$scope.storeTime();
				$scope.removeItem(currentIndex);
                        	$scope.timerStatus = SCHEDULE_STARTED;
                        	$scope.stopTimer();
                	}
        	}, 1000);

        };

        $scope.stopTimer = function() {
                if (angular.isDefined(stop)) {
                        $scope.timerStatus = SCHEDULE_STOPPED;
			$interval.cancel(stop);
                        stop = undefined;
                }
        };

        $scope.startTime = function(){
                $scope.timerStatus = SCHEDULE_STARTED;
		$scope.timer();
        };

        $scope.skipTimer = function(){
		
		$scope.skippedTaskStatus = true;
                $scope.stopTimer();
                $scope.storeTime();
		$scope.display='';
                $scope.timeLeft ='';
                $scope.timerStatus = SCHEDULE_STARTED;

		// TODO : figure out how to do minutes worked on
		var skipped = $scope.items[currentIndex];
		$scope.skippedTasks.push(skipped);
		
		$scope.remoteItem(currentIndex);
		$scope.scheduleTimer();
		
        };

        $scope.$on('$destroy', function() {
		// Make sure that the interval is destroyed too
		$scope.stopTimer();
	});


}]);
