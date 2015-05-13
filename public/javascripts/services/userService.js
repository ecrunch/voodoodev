
var app = angular.module('userService',[]);


app.factory('User', [
'$http',
'auth',
function($http, auth) {

        var user = {

                breatherIds: [

                ],

                breathers: [

                ],
                courseIds: [

                ],

                courses: [

                ],
                taskIds: [

                ],

                tasks: [

                ]
        };

        user.initialize = function(loadAll) {

                return $http.post('/user', null, {
                        headers: {
                                Authorization: 'Bearer '+auth.getToken()
                        }
                })
                .then(
                        //success
                        function(data) {
                                user.breatherIds = data.data.myBreathers;
                                user.breathers = data.data.breathers;
                                user.courseIds = data.data.myCourses;
                                user.courses = data.data.courses;
                                user.taskIds = data.data.myTasks;
                                user.tasks = data.data.tasks;
                        },
                        //failuer
                        function() {
                                console.log("Error");
                        }
                );
        };


        return user;

}]);

