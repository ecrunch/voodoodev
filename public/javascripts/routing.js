var app = angular.module('courseRouting', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('home', {
                url: '/home',
                templateUrl: 'temps/userHomePage.html',
                controller: 'userHomePageCtrl',
                        

                }
        )
	
	.state('login', {
		url: '/login',
		templateUrl: 'temps/login.html',
		controller: 'AuthCtrl',
		onEnter: ['$state', 'auth', function($state, auth){
			if(auth.isLoggedIn()){
     			  $state.go('home');
   			 }
		  }]
		})

	.state('register', {
  		url: '/register',
 		templateUrl: 'temps/register.html',
		controller: 'AuthCtrl',
		onEnter: ['$state', 'auth', function($state, auth){
    			if(auth.isLoggedIn()){
      			  $state.go('home');
   			 }
 		    }]
		})
	

        .state('coursesHome', {
                url: '/courseshome',
                templateUrl: 'temps/coursesHome.html',
                controller: 'CourseMainCtrl',
                resolve: {
                        coursePromise: ['courses', function(courses){
                                return courses.getAll();
                        }]

                }
        })
        .state('courses', {
                url: '/courses/{id}',
                templateUrl: 'temps/courses.html',
                controller: 'CourseCtrl',
                resolve: {
                        course: ['$stateParams', 'courses', function($stateParams, courses) {
                                return courses.get($stateParams.id);
                        }]
                }
        })

        .state('tasksHome', {
                url: '/taskshome',
                templateUrl: 'temps/tasksHome.html',
                controller: 'TaskMainCtrl',
                resolve: {
                        taskPromise: ['Task', function(Task){
                                return Task.getAll();
                        }]

                }
        })
        .state('tasks', {
                url: '/tasks/{id}',
                templateUrl: 'temps/tasks.html',
                controller: 'SubTaskCtrl',
                resolve: {
                        task: ['$stateParams', 'tasks', function($stateParams, tasks) {
                                return tasks.get($stateParams.id);
                        }]
                }
        })
	
	.state('breathersHome', {
                url: '/breathershome',
                templateUrl: 'temps/breathersHome.html',
                controller: 'BreatherMainCtrl',
                resolve: {
                        breatherPromise: ['breathers', function(breathers){
                                return breathers.getAll();
                        }]

                }
        })

	
        .state('schedule', {
                url: '/schedule',
                templateUrl: 'temps/schedule.html',
                controller: 'ScheduleCtrl'
        })

	.state('userHomePage', {

		url: '/userHomePage',
		templateUrl: 'temps/userHomePage.html',
		controller: 'userHomePageCtrl'
	})

	.state('test', {
                url: '/test',
                templateUrl: 'temps/test.html',
                controller: 'TestCtrl'
        });

	
	


  $urlRouterProvider.otherwise('home');
}]);

