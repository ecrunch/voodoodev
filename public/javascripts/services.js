var app = angular.module('courseServices',[]);



app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};

auth.saveToken = function (token){
  $window.localStorage['flapper-news-token'] = token;
};

auth.getToken = function (){
  return $window.localStorage['flapper-news-token'];
}

auth.isLoggedIn = function(){
  var token = auth.getToken();

  if(token){
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

auth.currentUser = function(){
  if(auth.isLoggedIn()){
    var token = auth.getToken();
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload.username;
  }
};

auth.register = function(user){
  return $http.post('/register', user).success(function(data){
    auth.saveToken(data.token);
  });
};

auth.logIn = function(user){
  return $http.post('/login', user).success(function(data){
    auth.saveToken(data.token);
  });
};

auth.logOut = function(){
  $window.localStorage.removeItem('flapper-news-token');
};

  return auth;
}])


app.factory('tasks',['$http', 'auth', function($http, auth){
 var t = {
        tasks:[]
        };
          
        t.getAll = function() { 
                return $http.get('/tasks').success(function(data){
                         angular.copy(data, t.tasks);
                 });
         };
        
        t.get = function(id) {
                 return $http.get('/tasks/' + id).then(function(res){
                        return res.data;
                });
        };
        
        t.create = function(task) {
                return $http.post('/tasks', task, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                }).success(function(data){
                  t.tasks.push(data);
                 });

         };

        t.addComment = function(id, comment) {
                 return $http.post('/tasks/' + id + '/comments', comment, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                });
                };

        t.addSubTask = function(id, subTask) {
                 return $http.post('/tasks/' + id + '/subTasks', subTask, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
                });                                                                                 
                };

        t.upvote = function(task) {
                return $http.put('/tasks/' + task._id + '/upvote', null, {
                 headers: {Authorization: 'Bearer '+auth.getToken()}
                 })
                 .success(function(data){
                 task.upvotes += 1;
                 });
                };

        t.upvoteComment = function(task, comment) {
                return $http.put('/tasks/' + task._id + '/comments/'+ comment._id + '/upvote', null, {
                 headers: {Authorization: 'Bearer '+auth.getToken()}
                 })
                        .success(function(data){
                         comment.upvotes += 1;
                });
        };
    
 return t;
    
}]) 


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

        o.addCourseTask = function(id, courseTask) {
                 return $http.post('/courses/' + id + '/courseTasks', courseTask, {
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

 return o;

}])
