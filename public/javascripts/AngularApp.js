var app = angular.module('courseInput', 
	[
		'MainCtrl',
		'userHomePageCtrl',
		'ScheduleCtrl',
		'TimerCtrl',
		'BreatherCtrl',
		'ProgressTrackerCtrl',
        'TaskWallCtrl',
		'AuthCtrl',
		'NavCtrl',
		'SearchCtrl',

		'ui.router',
		'angularMoment',

		'authService',
		'progressTrackerService',
        'taskWallService',
		'userService',
		'scheduleService',
		'breatherService',
		'sessionService',

		'courseRouting',

		'contentItemDirective',
        'progressTrackerDirective',
		'youtubeDirective',
		'scheduleItemDirective'

	]
);
