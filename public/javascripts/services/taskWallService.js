var app = angular.module('taskWallService',[]);

app.factory('TaskWalls',['$http', 'auth', function($http, auth){

     var service = {
            taskWalls:[],
     };

     service.getAll = function() {
         console.log('here');
         return  $http.get('/taskWall').success(
             function(data){
                 angular.copy(data, service.taskWalls);
             }
             )
     };

     service.get = function(id) {
         console.log('here7');
         return $http.get('/taskWall/' + id).then(
             function(res){
                console.log(res.data);
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

