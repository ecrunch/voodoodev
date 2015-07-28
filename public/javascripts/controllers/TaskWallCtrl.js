var app = angular.module('TaskWallCtrl',[]);

app.controller('TaskWallCtrl', [
'$scope','$stateParams','TaskWalls','taskWall','auth',
function($scope,$stateParams, TaskWalls,taskWall, auth){
    $scope.user = auth.currentUser;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.taskWall = taskWall;
    console.log('here');
    $scope.addLink = function(){
        if($scope.videoName === '') { return; }
        TaskWalls.addLink(taskWall._id, {
            videoName:  $scope.videoName,
            link:       $scope.link,
            source: ($scope.link.slice(-11)),
            author: 'user',
        }).success(function(link) {
            $scope.taskWall.links.push(link);
        });
            $scope.videoName = '';
            $scope.link = '';
    };

    $scope.addPost = function(){
        if($scope.title === '') {
            return;
        }
        TaskWalls.addPost(taskWall._id, {
            title: $scope.title,
            pBody: $scope.pBody,
            author: 'user',
        }).success(function(post) {
            $scope.taskWall.posts.push(post);
        });
        $scope.pBody = '';
        $scope.title ='';
    };





}]);
