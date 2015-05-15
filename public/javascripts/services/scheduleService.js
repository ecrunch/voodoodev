var app = angular.module('scheduleService',[]);

app.factory('Schedule', [
'$http',
'auth',
function($http, auth){

        var service = {

                items: [


                ]

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
                        function() {
                                console.log("Could not store minutes");
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
                                var items = data.data;
                                for (var i = 0; i < items.length; i++) {
                                        service.items.push(items[i]);
                                }
                        },

                        // failure
                        function(){
                                alert("Error creating schedule");
                        }
                );
        };

        service.purge = function() {
                service.items = [];
        };

        service.save = function() {
                return;
        };
        return service;

}]);
