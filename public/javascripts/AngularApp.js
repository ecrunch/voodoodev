var app = angular.module('courseInput', ['userHomePageCtrl','ScheduleCtrl','BreatherCtrl','TaskCtrl','CourseCtrl','AuthCtrl','NavCtrl','ui.router','angularMoment','courseServices','courseRouting']);



app.controller('MainCtrl',
['$scope', '$stateParams',
function($scope, $stateParams) {
	$scope.message = "Test";
}]);


