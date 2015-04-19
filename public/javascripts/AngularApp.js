var app = angular.module('courseInput', ['ui.router','angularMoment','courseServices','courseRouting']);



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
'$scope', '$stateParams', 'Schedule', '$interval',
function($scope, $stateParams, Schedule, $interval) {
	var j;
        var i=0;
	$scope.tk=0;	
	var tacoTime = {	
	"tacos":[
                        {"name":"taco1", "time":5},
                        {"name":"taco2", "time":10},
                        {"name":"taco2", "time":30},
                        {"name":"taco2", "time":100}
                        ]};

	 
	$scope.newSchedule = function() {
	
		Schedule.purge();
		Schedule.createNew().then(function(){
			$scope.items = Schedule.items;
			j=undefined;
		});
	};

	
	$scope.tacoTimer = function(){
	if ( angular.isDefined(stop) ) return;
	if (angular.isUndefined(j)){
                j=i;
                $scope.pass();
        } else{
                j=j+1;
                $scope.pass();
        }
        };

	$scope.pass =function(){
		var item = $scope.items[j];
                var iTime = (item.minutes)*60000;
                $scope.iTime = iTime;
		$scope.tk=1;
		$scope.display = item.details.description;
		$scope.timer();
	};
	

	var stop;
        $scope.timer = function(){
        stop = $interval(function() {
                if ($scope.iTime > 0) {
                        $scope.iTime = $scope.iTime - 1000;
                        $scope.timerTimes = moment.duration($scope.iTime).seconds();
                        $scope.timerTimem = moment.duration($scope.iTime).minutes();
                } else {
                        $scope.tk=0;
                        $scope.stopTimer();
                }
        }, 1000);

        };
	
	$scope.stopTimer = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        };
	
	$scope.startTime=function(){
		$scope.timer();
	};
	
        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopTimer();
        });
	
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
	var now = moment().format('h:mm:ss a') ;
	var endTime;
	var time;
	var setTimer = 0;
	var timerTime = 0;
	var tacoTime = { 
		"tacos":[
			{"name":"taco1", "time":5},
			{"name":"taco2", "time":10},
			{"name":"taco2", "time":30},
			{"name":"taco2", "time":100}
			]};				 
	$scope.tnow = now;
	$scope.time = time;
	$scope.timerTimes = 0;
	$scope.timerTimem = 0;
	
	$scope.setEndTime = function(time){
		$scope.endTime = moment().add($scope.time, 'm').format('h:mm:ss a');
	};
	var ta = tacoTime.tacos[0];
	var tal = tacoTime.tacos.length;
	$scope.tal = tal;	
	
	$scope.testItem = ta.time;	

	$scope.timerTime =function(){
		 $scope.timerTime = (($scope.setTimer)*60000);
	};
	var next ='';
	var i = 0;
	$scope.i = i; 
	var j;
	
	$scope.tacoTimer = function(){ 
	if (angular.isUndefined(j)){  
		j=i;
		$scope.timer();
	} else{
		j=j+1;	
		$scope.timer();
	}
	};

		
	var stop;	
	$scope.timer = function(){
	if ( angular.isDefined(stop) ) return;
		var tacos = tacoTime.tacos[j];
        	var tTime = (tacos.time)*1000;
		$scope.tTime = tTime;	
	stop = $interval(function() {
		if ($scope.tTime > 0) {
			console.log(tTime);
			$scope.tTime = $scope.tTime - 1000;
			$scope.timerTimes = moment.duration($scope.tTime).seconds();
			$scope.timerTimem = moment.duration($scope.tTime).minutes();
		} else {
			console.log(tTime);
			$scope.stopTimer();
		}	
	}, 1000);	
	
	};

	$scope.stopTimer = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        };
	
	$scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopTimer();
        });	

}]).directive('momentInterval',['$interval', function($interval){

	return function(scope, element, attrs){
		var stopTime;

		function updateTime() {
			element.text(moment().format('h:mm:ss a'));
		}
		
		scope.$watch(attrs.momentInterval, function(){
			updateTime();
		});

		stopTime = $interval(updateTime, 1000);

		element.on('$destroy', function() {
			$interval.cancel(stopTime);
		});
	};
}]);	

