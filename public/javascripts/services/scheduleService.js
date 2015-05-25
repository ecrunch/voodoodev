var app = angular.module('scheduleService',[]);

app.factory('Schedule', [
'$http',
'auth',
function($http, auth){

        var service = {

        };

        service.storeTime = function(id, trackt){
                return $http.put('/tasks/' + id + '/time/' + trackt, null, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
                }).then(
                        // success
                        function(data) {
                                return data;
                        },
                        // faiure
                        function(err) {
                                console.log(err);
                        }
                );

        };

	


        service.createNew = function(time) {
                return $http.post('/new_schedule/' + time, null, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
                }).then(
                        // success
                        function(data){
				return data;
                        },

                        // failure
                        function(err){
                                console.log(err);
                        }
                );
        };

        return service;

}]);
