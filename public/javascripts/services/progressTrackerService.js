var app = angular.module('progressTrackerService',[]);

app.factory('progressTracker',['$http', 'auth', function($http, auth){

        var service = {
                progressTrackers:[],
        };

        service.getAll = function() {
                return $http.get('/progressTrackers').success(
                        function(data){
                                angular.copy(data, service.progressTrackers);
                        }
                );
        };


        service.get = function(id) {
                return $http.get('/progressTrackers/' + id).then(
                        function(res){
                                return res.data;
                        }
                );
        };

        service.create = function(progressTracker) {
                return $http.post('/progressTrackers', progressTracker, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
                }).success(
                        function(data){
                                service.progressTrackers.push(data);
                        }
                );
        };

        return service;

}]);
