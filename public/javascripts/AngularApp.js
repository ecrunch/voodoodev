var app = angular.module('courseInput', 
	['userHomePageCtrl',
	'ScheduleCtrl',
	'BreatherCtrl',
	'TaskCtrl',
	'CourseCtrl',
	'AuthCtrl',
	'NavCtrl',
	'SideNavCtrl',
	'ui.router',
	'angularMoment',
	'courseService',
	'authService',
	'taskService',
	'userService',
	'scheduleService',
	'breatherService',
	'courseRouting']
);



app.controller('MainCtrl',
['$scope', '$stateParams',
function($scope, $stateParams) {
	$scope.message = "Test";
}]);


