var app = angular.module('courseInput', ['ui.router','courseServices','courseRouting']);

app.controller('MainCtrl',
['$scope', '$stateParams',
function($scope, $stateParams) {
	$scope.message = "Test";
}]);


app.controller('AuthCtrl',
['$scope', '$state', 'auth',
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
}]);

app.controller('NavCtrl',
['$scope', 'auth','$state',
function($scope, auth, $state ){
	
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	$scope.logOut = function(){ 
		auth.logOut();
		$state.go('login');
	};

}]);
 

app.controller('CourseMainCtrl', 
['$scope', 'courses','auth', 
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
	};

	$scope.incrementUpvotes = function(course) {
		courses.upvote(course);
	};

	$scope.joinC = function(course){
	        courses.joinCourse(course);
        };
		
}]);


app.controller('CourseCtrl', 
['$scope', '$stateParams', 'courses', 'course', 'auth',
function($scope, $stateParams, courses, course, auth ){
	
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.course = course;

	$scope.addComment = function(){
  		if($scope.body === '') {
			return;
		}
		courses.addComment(course._id, {
			body: $scope.body,
			author: 'user',
		}).success(function(comment) {
    			$scope.course.comments.push(comment);
		});
		$scope.body = '';
	};
	
	$scope.addCourseTask = function(){

		if($scope.name=== '') {
			return;
		}

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
'$scope', 'Task','auth', 
function($scope, Task, auth){
  	
 	$scope.user = auth.currentUser;	
	$scope.isLoggedIn = auth.isLoggedIn;	
  	$scope.tasks = Task.tasks ;

  	$scope.addTask = function() {
        	if ($scope.title === '') {
			return;
		} 
        	Task.create({
        		description: $scope.newTaskDescription,
        		dueDate: $scope.newTaskDueDate,
			type:	$scope.newTaskType
        	});
        	$scope.newTaskDescription = '';
        	$scope.newTaskDueDate = '';
        	$scope.newTaskType = '';
	};

  	$scope.incrementUpvotes = function(task) {
        	Task.upvote(task);
	}; 

	$scope.joinT = function(task){
                Task.joinTask(task);
        };      
}]);

app.controller('SubTaskCtrl',
['$scope', '$stateParams', 'Task', 'task', 'auth',
function($scope, $stateParams, Task, task, auth){
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
                 Task.addSubTask(task._id, {
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
                Task.upvoteComment(task, comment);
        };
}]);

app.controller('BreatherCtrl',
['$scope', '$stateParams', 'breathers', 'breather', 'auth',
function($scope, $stateParams, Breather, breather, auth){
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.breather = breather;
}]);

app.controller('BreatherMainCtrl', [
'$scope', 'breathers','auth', 
function($scope, breathers, auth){
  	
	$scope.isLoggedIn = auth.isLoggedIn;
  	$scope.breathers = breathers.breathers ;

  	$scope.addBreather = function() {
        	if ($scope.title === '') {
			return;
		}
        	breathers.create({
        		title: $scope.title,
        		link: $scope.link,
        	});
        	$scope.title = '';
        	$scope.link = '';
	};
	
	$scope.joinB = function(breather){
		breathers.joinBreather(breather); 
	};	

  	$scope.incrementUpvotes = function(breather) {
        	breathers.upvote(breather);
	};
}]);



app.controller('ScheduleCtrl', [
'$scope', '$stateParams', 'Schedule',
function($scope, $stateParams, Schedule) {


	$scope.newSchedule = function() {
		Schedule.purge();
		Schedule.createNew();
		$scope.items = Schedule.items;
	};


	$scope.newSchedule();

}]);


app.controller('userHomePageCtrl', [
'$scope', 'auth', 'User',
function($scope, auth, User) {

	$scope.loadAll = true;
	//$scope.loadAll = false;

	$scope.tasks = [];

	User.initialize($scope.loadAll)
	.then(
		function() {
			$scope.breatherIds = User.breatherIds;
			$scope.breathers = User.breathers;
			$scope.courseIds = User.courseIds;
                        $scope.courses = User.courses;
			$scope.taskIds = User.breatherIds;
                        $scope.tasks = User.tasks;
		},
		function() {
			console.log("Error");
		}
	);


}]);

