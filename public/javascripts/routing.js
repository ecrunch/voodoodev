var app = angular.module('courseRouting', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('home', {
                url: '/home',
                templateUrl: 'temps/home.html',
                controller: 'MainCtrl',
                resolve: {
                        coursePromise: ['courses', function(courses){
                                return courses.getAll();
                        }]

                }
        })
	
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
                        taskPromise: ['tasks', function(tasks){
                                return tasks.getAll();
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

        .state('schedule', {
                url: '/schedule',
                templateUrl: 'temps/schedule.html',
                controller: 'ScheduleCtrl'
        })

	.state('test', {
                url: '/test',
                templateUrl: 'temps/test.html',
                controller: 'TestCtrl'
        });

	
	


  $urlRouterProvider.otherwise('home');
}]);

