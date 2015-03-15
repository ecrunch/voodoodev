var app = angular.module('courseInput', ['ui.router']);


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider
    	.state('home', {
      		url: '/home',
      		templateUrl: '/home.html',
      		controller: 'MainCtrl',
      		resolve: { 
			coursePromise: ['courses', function(courses){
 		  		return courses.getAll();
   		 	}]	

		}  
    	})
 	.state('courses', {
      		url: '/courses/{id}',
      		templateUrl: '/courses.html',
      		controller: 'CourseCtrl',
		resolve: {
   	 		course: ['$stateParams', 'courses', function($stateParams, courses) {
      				return courses.get($stateParams.id);
    			}]   
		}
	})
	.state('schedule', {
		url: '/schedule',
		templateUrl: '/schedule.html',
		controller: 'ScheduleCtrl'
	});


  $urlRouterProvider.otherwise('home');
}]);


app.factory('courses',['$http',function($http){
 var o = {
	courses:[]
	};

	o.getAll = function() {
    		return $http.get('/courses').success(function(data){
     			 angular.copy(data, o.courses);
   		 });
 	 };
	
	o.get = function(id) {
 		 return $http.get('/courses/' + id).then(function(res){
    			return res.data;
 		});
	};
	
	o.create = function(course) {
  		return $http.post('/courses', course).success(function(data){
  		  o.courses.push(data);
 		 });

	 };

	o.addComment = function(id, comment) {
 		 return $http.post('/courses/' + id + '/comments', comment);
		};

	o.addCourseTask = function(id, courseTask) {
                 return $http.post('/courses/' + id + '/courseTasks', courseTask);
                };

	o.upvote = function(course) {
  		return $http.put('/courses/' + course._id + '/upvote')
   		 .success(function(data){
     		 course.upvotes += 1;
   		 });
		};
	
	o.upvoteComment = function(course, comment) {
  		return $http.put('/courses/' + course._id + '/comments/'+ comment._id + '/upvote')
    			.success(function(data){
     			 comment.upvotes += 1;
    		});
	};

 return o;

}])
 
app.controller('MainCtrl', [
'$scope', 'courses', 
function($scope, courses ){
  $scope.courses = courses.courses ;

  $scope.addCourse = function() {
	if ($scope.title === '') {return;} 
	courses.create({
	title: $scope.title,
	link: $scope.link,
	});
	$scope.title = '';
	$scope.link = '';
}

  $scope.incrementUpvotes = function(course) {
	courses.upvote(course);
}	
}])
app.controller('CourseCtrl', [
'$scope',
'$stateParams',
'courses',
'course',
function($scope, $stateParams, courses, course){
	$scope.course = course;

	$scope.addComment = function(){
  		if($scope.body === '') { return; }
 		 courses.addComment(course._id, {
    			body: $scope.body,
    			author: 'user',
  		}).success(function(comment) {
    			$scope.course.comments.push(comment);
 		 });
 		 	$scope.body = '';
		};
	
	 $scope.addCourseTask = function(){
                if($scope.bodu === '') { return; }
                 courses.addCourseTask(course._id, {
                        body: $scope.body,
			dueDate: $scope.dueDate,
                        author: 'user',
                }).success(function(courseTask) {
                        $scope.course.courseTasks.push(courseTask);
                 });
                        $scope.body = '';
			$scope.dueDate = '';
                };
	

	$scope.incrementUpvotes = function(comment){
  		courses.upvoteComment(course, comment);
	};	
}]);



app.controller('ScheduleCtrl', [
	'$scope',
	'$stateParams',
	function($scope, $stateParams) {
		$scope.message = "Test";
	}
]);


