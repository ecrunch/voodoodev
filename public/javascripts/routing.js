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
        .state('schedule', {
                url: '/schedule',
                templateUrl: 'temps/schedule.html',
                controller: 'ScheduleCtrl'
        });


  $urlRouterProvider.otherwise('home');
}]);

