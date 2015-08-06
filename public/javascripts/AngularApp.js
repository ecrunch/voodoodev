var app = angular.module('courseInput', 
	[
		'MainCtrl',
		'userHomePageCtrl',
		'ScheduleCtrl',
		'TimerCtrl',
		'BreatherCtrl',
		'ProgressTrackerCtrl',
		'TaskHomeCtrl',
        'TaskWallCtrl',
		'AuthCtrl',
		'NavCtrl',
		'SearchCtrl',
        'UploadCtrl',

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

		'progressTrackerDirective',
		'youtubeDirective',
		'taskListDirective',
		'scheduleItemDirective'

	]
);
