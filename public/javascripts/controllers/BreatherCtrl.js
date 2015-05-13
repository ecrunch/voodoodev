var app = angular.module('BreatherCtrl',[]);


app.controller('BreatherCtrl',
['$scope', '$stateParams', 'breathers', 'breather', 'auth',
function($scope, $stateParams, breathers, breather, auth){
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.breather = breather;

        $scope.addLink = function(){
                if($scope.title === '') { return; }
                 breathers.addLink(breather._id, {
                        title: $scope.title,
                        link: $scope.link,
                        author: 'user',
                }).success(function(link) {
                        $scope.breather.links.push(link);
                 });

                        $scope.title = '';
                        $scope.link = '';
                };

}]);

app.controller('BreatherMainCtrl', [
'$scope', 'breathers','auth',
function($scope, breathers, auth){

        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.breathers = breathers.breathers ;

        $scope.addBreather = function() {
                if ($scope.title === '') {
                        return;
                }
                breathers.create({
                        title: $scope.title,
                        link: $scope.link,
                });
                $scope.title = '';
                $scope.link = '';
        };

        $scope.joinB = function(breather){
                breathers.joinBreather(breather);
        };

        $scope.incrementUpvotes = function(breather) {
                breathers.upvote(breather);
        };
}]);

