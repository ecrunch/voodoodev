var app = angular.module('taskService',[]);

app.factory('Task',['$http', 'auth', function($http, auth){

        var service = {
                tasks:[],
                taskWall:[]
        };

        service.getAll = function() {
                return $http.get('/tasks').success(
                        function(data){
                                angular.copy(data, service.tasks);
                        }
                );
        };

        service.get = function(id) {
            return $http.get('/taskWall/' + id).then(
                function(res){
                    return res.data;
                }
            );
        };

        service.get = function(id) {
                return $http.get('/tasks/' + id).then(
                        function(res){
                                return res.data;
                        }
                );
        };

        service.create = function(task) {
                return $http.post('/tasks', task, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
                }).success(
                        function(data){
                                service.tasks.push(data);
                        }
                );
        };

        service.addComment = function(id, comment) {
                return $http.post('/tasks/' + id + '/comments', comment, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
                });
        };


        service.upvote = function(task) {
                return $http.put('/tasks/' + task._id + '/upvote', null, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
                }).success(
                        function(data){
                                task.upvotes += 1;
                        }
                );
        };

        service.upvoteComment = function(task, comment) {
                return $http.put('/tasks/' + task._id + '/comments/'+ comment._id + '/upvote', null, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
                }).success(
                        function(data){
                                comment.upvotes += 1;
                        }
                );
        };

        service.joinTask = function(task) {
                return $http.post('/tasks/'+ task._id+'/joinTask',null, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
                }).then(
                        //success
                        function(data) {
                        },
                        //failure
                        function() {
                                console.log("Error");
                        }
                );

        };

        return service;

}]);
