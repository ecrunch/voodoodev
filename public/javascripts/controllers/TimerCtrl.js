
var app = angular.module('TimerCtrl', ['angularMoment']);

app.controller('TimerCtrl', [
'$scope', '$interval', 'Schedule',
function($scope, $interval, Schedule) {

	
	var aud = new Audio('Audio/beep-07.mp3');
	$scope.playAudio = function(){
		aud.play();
	};

	var stop;	
	var SELECT_HOURS = 0;
	var BEGIN_SCHEDULE = 1;
	var SCHEDULE_RUNNING = 2;
	var SCHEDULE_PAUSED = 3;
	var currentIndex = 0;

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
                $scope.setTimerStatus(SCHEDULE_RUNNING);
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
                        	$scope.setTimerStatus(SCHEDULE_PAUSED);
                        	$scope.stopTimer();
				$scope.endBeeper();
				$scope.pass();
                	}
        	}, 1000);

        };
	
	$scope.endBeeper =function() {
		$scope.threeBeeps = 3;
		beeper = $interval(function() {
				if ($scope.threeBeeps > 0) {
					$scope.playAudio()
					$scope.threeBeeps = $scope.threeBeeps - 1;
				} else {
				$interval.cancel(beeper);
				}
		}, 1000);
	};

        $scope.stopTimer = function() {
                if (angular.isDefined(stop)) {
                        $scope.setTimerStatus(SCHEDULE_PAUSED);
			$interval.cancel(stop);
                        stop = undefined;
                }
        };

        $scope.resumeTimer = function(){
                $scope.setTimerStatus(SCHEDULE_RUNNING);
		$scope.timer();
        };

        $scope.skipTimer = function(){
		
                $scope.stopTimer();
                $scope.storeTime();
		$scope.display='';
                $scope.timeLeft ='';
                $scope.setTimerStatus(SCHEDULE_RUNNING);
		
		$scope.skipTask(currentIndex);
	
		$scope.startTimer();   // TODO : should be resume but had to make it work
		
        };
	/*        
	$scope.$on('$destroy', function() {
		// Make sure that the interval is destroyed too
		$scope.stopTimer();
	});
	*/
}]);

