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
	
	$scope.addAssignment = function(){
		if($scope.name=== '') {
			return;
		}

		courses.addAssignment(course._id, {
			name: $scope.name,
			dueDate: $scope.dueDate,
			author: 'user',
			type: $scope.type
		}).success(function(assignment) {
			$scope.course.assignments.push(assignment);
		});
			$scope.name = '';
			$scope.dueDate = '';
	};
	
	$scope.incrementUpvotes = function(comment){
		courses.upvoteComment(course, comment);
	};
	
	$scope.joinAssignment = function(assignment) {
		courses.joinAssignment(assignment);
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
	 
	$scope.newSchedule = function() {
	
		Schedule.purge();
		Schedule.createNew().then(function(){
			$scope.items = Schedule.items;
			j=undefined;
			$scope.iTime = 0;
		});
	};
	$scope.storeTime = function(id,trackt){
		id =  $scope.id;	
		trackt = (($scope.tTime-$scope.iTime)/60000);
		Schedule.storeTime(id, trackt);	
	/*	console.log(trackt);*/

	};

	
	$scope.scheduleTimer = function(){
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
		$scope.tTime = iTime;
		$scope.tk=1;
		$scope.display = item.details.description;
		$scope.id = item.details.id;
		$scope.timer();
	};
	

	var stop;
        $scope.timer = function(){
        stop = $interval(function() {
                if ($scope.iTime > 0) {
                        $scope.timerTimes = moment.duration($scope.iTime).seconds();
                        $scope.timerTimem = moment.duration($scope.iTime).minutes();
                	$scope.iTime = $scope.iTime - 1000;
		} else {
                        $scope.tk=0;
                        $scope.stopTimer();
                }
        }, 1000);

        };
	
	$scope.stopTimer = function() {
		console.log(($scope.tTime - $scope.iTime));	
		if (angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
		}
        };
	
	$scope.startTime=function(){
		$scope.timer();
	};
	
	$scope.skipTimer = function(){
		console.log('test');
		$scope.stopTimer();
		$scope.display='';
		$scope.iTime ='';
		$scope.scheduleTimer();
	};
	
        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopTimer();
        });
	
	$scope.newSchedule();

}]);


app.controller('userHomePageCtrl', [
'$scope', 'auth', 'User','Task','courses',
function($scope, auth, User, Task, courses) {

	$scope.loadAll = true;
	//$scope.loadAll = false;

	$scope.tasks = [];

	$scope.pendingAssignments = [];

	User.initialize($scope.loadAll)
	.then(
		function() {
			$scope.breatherIds = User.breatherIds;
			$scope.breathers = User.breathers;
			$scope.courseIds = User.courseIds;
                        $scope.courses = User.courses;
			$scope.taskIds = User.breatherIds;
                        $scope.tasks = User.tasks;


			// only do this once the other shit is loaded? regardless, need to refactor
			$scope.getPendingAssignments()
			.then(
				// success
				function(data) {
					console.log('im here');
					$scope.pendings = data.data;
					console.log($scope.pendings[0]);
					//alert(data);
					$scope.pendingAssignments = data;	
				},
				// error
				function() {
					console.log("Controller: Error loading pending assignments");
				}
			);

		},
		function() {
			console.log("Error loading user data");
		}
	);

	// returns a promise or some shit
	$scope.getPendingAssignments = function() {
		return courses.getPendingAssignments();
	};
	$scope.joined = function(assId){
		courses.joined(assId);
		};
	
	$scope.joinAssignment = function(assId) {
		Task.create({
			description:	assId.name,
        		dueDate:	assId.dueDate,
        		type:		assId.type
		});
		
		$scope.joined(assId._id);
	};


}]);

