var app = angular.module('courseInput', ['ui.router','courseServices','courseRouting']);


app.controller('MainCtrl', [
	'$scope',
	'$stateParams',
	function($scope, $stateParams) {
		$scope.message = "Test";
	}
])


app.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}])

app.controller('NavCtrl', [
	'$scope',
	'auth',
	function($scope, auth){
 	 $scope.isLoggedIn = auth.isLoggedIn;
 	 $scope.currentUser = auth.currentUser;
 	 $scope.logOut = auth.logOut;
	}]);
 
app.controller('CourseMainCtrl', [
	'$scope', 'courses','auth', 
	function($scope, courses, auth ){
	$scope.isLoggedIn = auth.isLoggedIn;
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
'auth',
function($scope, $stateParams, courses, course, auth ){
	$scope.isLoggedIn = auth.isLoggedIn;
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
                if($scope.name=== '') { return; }
                 courses.addCourseTask(course._id, {
                        name: $scope.name,
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

app.controller('TaskMainCtrl', [
'$scope', 'tasks','auth', 
function($scope, tasks, auth){
  $scope.isLoggedIn = auth.isLoggedIn;	
  $scope.tasks = tasks.tasks ;

  $scope.addTask = function() {
        if ($scope.title === '') {return;} 
        tasks.create({
        title: $scope.title,
        link: $scope.link,
        });
        $scope.title = '';
        $scope.link = '';
}

  $scope.incrementUpvotes = function(task) {
        tasks.upvote(task);
}       
}])

app.controller('SubTaskCtrl', [
'$scope',
'$stateParams',
'tasks',
'task',
'auth',
function($scope, $stateParams, tasks, task, auth){
        $scope.isLoggedIn = auth.isLoggedIn;
	$scope.task = task;
          
        $scope.addComment = function(){
                if($scope.body === '') { return; }
                 tasks.addComment(task._id, {
                        body: $scope.body,
                        author: 'user',
                }).success(function(comment) {
                        $scope.task.comments.push(comment);
                 }); 
                        $scope.body = '';
                }; 
        
         $scope.addSubTask = function(){
                if($scope.name=== '') { return; }
                 tasks.addSubTask(task._id, {
                        name: $scope.name,
                        dueDate: $scope.dueDate,
                        author: 'user',
                }).success(function(subTask) {
                        $scope.task.subTasks.push(subTask);
                 });
                        $scope.body = '';
                        $scope.dueDate = '';
                };


        $scope.incrementUpvotes = function(comment){
                tasks.upvoteComment(task, comment);
        };
}]);


app.controller('ScheduleCtrl', [
	'$scope',
	'$stateParams',
	function($scope, $stateParams) {
		$scope.message = "Test";
	}
]);

app.controller('TestCtrl', [
        '$scope',
        '$stateParams',
        function($scope, $stateParams) {
                $scope.message = "Test";
        }
]);
