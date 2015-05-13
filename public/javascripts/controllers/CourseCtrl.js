var app = angular.module('CourseCtrl',[]);


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

