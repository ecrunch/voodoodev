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
                controller: 'TaskCtrl',
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

	.state('breathers', {
                url: '/breathers/{id}',
                templateUrl: 'temps/breathers.html',
                controller: 'BreatherCtrl',
                resolve: {
                        breather: ['$stateParams', 'breathers', function($stateParams, breathers) {
                                return breathers.get($stateParams.id);
                        }]
                }
        })

	
        .state('schedule', {
                url: '/schedule',
                templateUrl: 'temps/schedule.html',
                controller: 'ScheduleCtrl'
        })
	
	.state('makeSchedule', {
                url: '/makeSchedule',
                templateUrl: 'temps/home_partials/schedule.html',
                controller: 'ScheduleHomeCtrl'
        })	
	
	
	.state('userHomePage', {

		url: '/userHomePage',
		templateUrl: 'temps/userHomePage.html',
		controller: 'userHomePageCtrl'
	})

	.state('test', {
                url: '/test',
                templateUrl: 'temps/test.html',
                controller: 'TimeCtrl'
        })
    
    .state('activeItem', {
            url: '/activeItem',
            templateUrl: 'temps/activeItem.html'
    })

    .state('create', {
            url: '/create',
            templateUrl: 'temps/create.html'
     })
	
    .state('taskWall', {
            url:'/taskWall/{id}',
            templateUrl: 'temps/taskWall.html',
            controller: 'TaskWallCtrl',
            resolve: { 
                taskWall: ['$stateParams', 'TaskWalls', function($stateParams, TaskWalls) {
                    return TaskWalls.get($stateParams.id); 
                    }]
            }
                });


  $urlRouterProvider.otherwise('home');
}]);

