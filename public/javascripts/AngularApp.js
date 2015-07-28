var app = angular.module('courseInput', 
	[
		'MainCtrl',
		'userHomePageCtrl',
		'ScheduleCtrl',
		'TimerCtrl',
		'BreatherCtrl',
		'TaskCtrl',
		'TaskHomeCtrl',
        'TaskWallCtrl',
		'CourseCtrl',
		'AuthCtrl',
		'NavCtrl',
		'SearchCtrl',

		'ui.router',
		'angularMoment',

		'courseService',
		'authService',
		'taskService',
        'taskWallService',
		'userService',
		'scheduleService',
		'breatherService',
		'sessionService',

		'courseRouting',

		'taskDirective',
		'youtubeDirective',
		'taskListDirective',
		'scheduleItemDirective'

	]
);
