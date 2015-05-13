var app = angular.module('ScheduleCtrl',['angularMoment']);


app.controller('ScheduleCtrl', [
'$scope', '$stateParams', 'Schedule', '$interval',
function($scope, $stateParams, Schedule, $interval) {
        var j;
        var i=0;
        $scope.tk=0;

        $scope.newSchedule = function() {

                Schedule.purge();
                Schedule.createNew().then(function(){
                        $scope.items = Schedule.items;
                        j=undefined;
                        $scope.iTime = 0;
                });
        };
        $scope.storeTime = function(id,trackt){
                id =  $scope.id;
                trackt = (($scope.tTime-$scope.iTime)/60000);
                Schedule.storeTime(id, trackt);

        };


        $scope.scheduleTimer = function(){
        if ( angular.isDefined(stop) ) return;
        if (angular.isUndefined(j)){
                j=i;
                $scope.pass();
        } else{
                j=j+1;
                $scope.pass();
        }
        };

        $scope.pass =function(){
                var item = $scope.items[j];
                var iTime = (item.minutes)*60000;
                $scope.iTime = iTime;
                $scope.tTime = iTime;
                $scope.tk=1;
                $scope.display = item.details.description;
                $scope.id = item.details.id;
                $scope.timer();
        };

        var stop;
        $scope.timer = function(){
        stop = $interval(function() {
                if ($scope.iTime > 0) {
                        $scope.timerTimes = moment.duration($scope.iTime).seconds();
                        $scope.timerTimem = moment.duration($scope.iTime).minutes();
                        $scope.iTime = $scope.iTime - 1000;
                } else {
                        $scope.tk=0;
                        $scope.stopTimer();
                }
        }, 1000);

        };

        $scope.stopTimer = function() {
                if (angular.isDefined(stop)) {
                        $interval.cancel(stop);
                        stop = undefined;
                }
        };

        $scope.startTime=function(){
                $scope.timer();
        };

        $scope.skipTimer = function(){
                $scope.stopTimer();
                $scope.display='';
                $scope.iTime ='';
                $scope.scheduleTimer();
        };

        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopTimer();
        });

        $scope.newSchedule();

}]);
