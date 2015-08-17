var app = angular.module('taskWallService',[]);

app.factory('TaskWalls',['$http', 'auth', function($http, auth){

     var service = {
            taskWalls:[],
     };

     service.getAll = function() {
         return  $http.get('/taskWall').success(
             function(data){
                 angular.copy(data, service.taskWalls);
             }
             )
     };

     service.get = function(id) {
         return $http.get('/taskWall/' + id).then(
             function(res){
                 return res.data;
             }
             );
     };
    
    service.addPost = function(id, post) {
         return $http.post('/taskWall/' + id + '/posts', post, {
             headers: {Authorization: 'Bearer '+auth.getToken()}
         });
    };

    service.addLink = function(id, link) {
        return $http.post('/taskWall/' + id + '/links', link, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };


     return service;

}]);

