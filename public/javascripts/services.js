var app = angular.module('courseServices',[]);

app.factory('tasks',['$http',function($http){
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
                return $http.post('/tasks', task).success(function(data){
                  t.tasks.push(data);
                 });

         };

        t.addComment = function(id, comment) {
                 return $http.post('/tasks/' + id + '/comments', comment);
                };

        t.addSubTask = function(id, subTask) {
                 return $http.post('/tasks/' + id + '/subTasks', subTask);                                                                                 
                };

        t.upvote = function(task) {
                return $http.put('/tasks/' + task._id + '/upvote')
                 .success(function(data){
                 task.upvotes += 1;
                 });
                };

        t.upvoteComment = function(task, comment) {
                return $http.put('/tasks/' + task._id + '/comments/'+ comment._id + '/upvote')
                        .success(function(data){
                         comment.upvotes += 1;
                });
        };
    
 return t;
    
}]) 


app.factory('courses',['$http',function($http){
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
                return $http.post('/courses', course).success(function(data){
                  o.courses.push(data);
                 });

         };

        o.addComment = function(id, comment) {
                 return $http.post('/courses/' + id + '/comments', comment);
                };

        o.addCourseTask = function(id, courseTask) {
                 return $http.post('/courses/' + id + '/courseTasks', courseTask);
                };

        o.upvote = function(course) {
                return $http.put('/courses/' + course._id + '/upvote')
                 .success(function(data){
                 course.upvotes += 1;
                 });
                };

        o.upvoteComment = function(course, comment) {
                return $http.put('/courses/' + course._id + '/comments/'+ comment._id + '/upvote')
                        .success(function(data){
                         comment.upvotes += 1;
                });
        };

 return o;

}])
