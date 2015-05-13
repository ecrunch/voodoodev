var app = angular.module('breatherService',[]);

app.factory('breathers',['$http', 'auth', function($http, auth){
var b = {
        breathers:[]
        };

        b.getAll = function() {
                return $http.get('/breathers').success(function(data){
                angular.copy(data, b.breathers);
                });
        };

        b.get = function(id) {
                return $http.get('/breathers/' + id).then(function(res){
                        return res.data;
                });
        };


        b.create = function(breather) {
                return $http.post('/breathers', breather, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                }).success(function(data){
                        b.breathers.push(data);
                });

        };

        b.upvote = function(breather) {
                return $http.put('/breathers/' + breather._id + '/upvote', null, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                })
                .success(function(data){
                breather.upvotes += 1;
                });
        };

        b.addLink = function(id, link) {
                return $http.post('/breathers/' + id + '/links', link, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                });
        };

        b.joinBreather = function(breather) {

                return $http.post('/breathers/'+ breather._id+'/joinBreather',null, {
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
return b;
}]);

