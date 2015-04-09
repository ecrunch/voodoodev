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

	$scope.addPost = function(){
                if($scope.title === '') {
                        return;
                }
                courses.addPost(course._id, {
                        title: $scope.title,
                        pBody: $scope.pBody,
                        author: 'user',
                }).success(function(post) {
                        $scope.course.posts.push(post);
                });
                $scope.pBody = '';
                $scope.title ='';
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
function($scope, $stateParams, breathers, breather, auth){
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.breather = breather;

	$scope.addLink = function(){
                if($scope.title === '') { return; }
                 breathers.addLink(breather._id, {
                        title: $scope.title,
                        link: $scope.link,
                        author: 'user',
                }).success(function(link) {
                        $scope.breather.links.push(link);
                 });

                        $scope.title = '';
                        $scope.link = '';
                };
	
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


app.controller('TimeCtrl', ['$scope', '$interval',
      function($scope, $interval) {
        $scope.format = 'M/d/yy h:mm:ss a';
        $scope.blood_1 = 100;
        $scope.blood_2 = 120;

        var stop;
        $scope.fight = function() {
          // Don't start a new fight if we are already fighting
          if ( angular.isDefined(stop) ) return;

          stop = $interval(function() {
            if ($scope.blood_1 > 0 && $scope.blood_2 > 0) {
              $scope.blood_1 = $scope.blood_1 - 3;
              $scope.blood_2 = $scope.blood_2 - 4;
            } else {
              $scope.stopFight();
            }
          }, 100);
        };

        $scope.stopFight = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        };

        $scope.resetFight = function() {
          $scope.blood_1 = 100;
          $scope.blood_2 = 120;
        };

        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopFight();
        });
      }])
    // Register the 'myCurrentTime' directive factory method.
    // We inject $interval and dateFilter service since the factory method is DI.
    .directive('myCurrentTime', ['$interval', 'dateFilter',
      function($interval, dateFilter) {
        // return the directive link function. (compile function not needed)
        return function(scope, element, attrs) {
          var format,  // date format
              stopTime; // so that we can cancel the time updates

          // used to update the UI
          function updateTime() {
            element.text(dateFilter(new Date(), format));
          }

          // watch the expression, and update the UI on change.
          scope.$watch(attrs.myCurrentTime, function(value) {
            format = value;
            updateTime();
          });

          stopTime = $interval(updateTime, 1000);

          // listen on DOM destroy (removal) event, and cancel the next UI update
          // to prevent updating time after the DOM element was removed.
          element.on('$destroy', function() {
            $interval.cancel(stopTime);
          });
        };
      }]);

