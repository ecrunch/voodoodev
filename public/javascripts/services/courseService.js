
var app = angular.module('courseService',[]);


app.factory('courses',['$http', 'auth', function($http, auth){

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
                return $http.post('/courses', course, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                }).success(function(data){
                o.courses.push(data);
        });

        };

        o.addComment = function(id, comment) {
                return $http.post('/courses/' + id + '/comments', comment, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                });
        };

        o.addPost = function(id, post) {
                return $http.post('/courses/' + id + '/posts', post, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                });
        };

        o.addAssignment = function(id, assignment) {
                return $http.post('/courses/' + id + '/assignments', assignment, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                });
        };

        o.joined = function(id) {
                return $http.put('/assignments/' + id + '/joined', null, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                });

        };

        o.upvote = function(course) {
                return $http.put('/courses/' + course._id + '/upvote', null, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                })
                .success(function(data){
                course.upvotes += 1;
                });
        };
	
	o.upvoteComment = function(course, comment) {
                return $http.put('/courses/' + course._id + '/comments/'+ comment._id + '/upvote', null, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                })
                .success(function(data){
                        comment.upvotes += 1;
                });
        };

        o.joinCourse = function(course) {
                return $http.post('/courses/'+ course._id+'/joinCourse',null, {
                headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
                })
                .then(
                        //success
                        function(data) {
                        },
                        //failure
                        function() {
                                console.log("Error");
                        }
                );
        };

        o.joinAssignment = function(assignment) {
                return $http.post('/assignments/' + assignment._id + '/join', null,
                        {
                                headers: {
                                        Authorization: 'Bearer ' + auth.getToken()
                                }
                        }
                )
                .then(
                        // success
                        function(data) {

                        },
                        // error
                        function() {
                                console.log("Error joining assignments");
                        }
                );
        };

        o.getPendingAssignments = function() {

                return $http.post('/get_pending_assignments', null,
                        {
                                headers: {
                                        Authorization: 'Bearer ' + auth.getToken()
                                }
                        }
                )
                .then(
                        // success
                        function(data) {
                                return data;
                        },
                        //  error
                        function() {
                                console.log('Service: Error loading pending assignments');
                        }
                );
        };

        return o;

}]);

