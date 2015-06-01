
var app = angular.module('SearchCtrl', []);

app.controller('SearchCtrl', [

'$scope',

function($scope) {

	// SHOULD error handle on this	
	$scope.getSearchResults = function(val) {
		
		var results = [];

		$scope.courses
			.filter(function(d) {
				return d.title.toLowerCase().indexOf(val.toLowerCase()) >= 0;
			})
			.forEach(function(d) {
				results.push(
					{
						text: 'course: ' + d.title,
						title: d.title,
						url: '/courses/' + d._id
					}
				);
			});

		$scope.breathers
			.filter(function(d) {
				return d.title.toLowerCase().indexOf(val.toLowerCase()) >= 0;
			})
			.forEach(function(d) {
				results.push(
					{
						text: 'breather: ' + d.title,
						title: d.title,
						url: '/breathers/' + d._id
					}
				);
			});

		return results;

	};  // end of search results func

}]); 


