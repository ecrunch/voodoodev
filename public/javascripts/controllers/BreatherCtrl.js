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
			            source: ($scope.link.slice(-11)),
                        author: 'user',
                }).success(function(link) {
                        $scope.breather.links.push(link);
                });

                        $scope.title = '';
                        $scope.link = '';
                };

        $scope.addContent = function(){
            if($scope.name === '') {return;}
            $scope.length = $scope.data.length
            console.log($scope.length) 
            if($scope.contentType === "youtube") {
                $scope.source = $scope.data.slice(-11)
            } else if ($scope.contentType === "imgur") {
                console.log($scope.data.length)
                if ($scope.data.length === 30){
                    $scope.source = ('a/' + $scope.data.slice(-5))
                } else {
                    $scope.source = ($scope.data.slice(-7))
                    
                }
            }

            breathers.addContent(breather._id, {
                name:           $scope.name,
                data:           $scope.data,
                contentType:    $scope.contentType,
                source:         $scope.source 
            }).success(function(content) {
                $scope.breather.content.push(content);
            });

                $scope.name        = '';
                $scope.data        = '';
                $scope.contentType = '';
                $scope.source      = '';  
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

