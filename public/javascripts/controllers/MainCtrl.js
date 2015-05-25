

var app = angular.module('MainCtrl', ['ui.bootstrap']);


app.controller('MainCtrl', [

'$scope', 'courses',  '$location', 'breathers', 

function($scope, courses, $location, breathers){ 


	// SHOULD error handle on this	
	$scope.getSearchResults = function(val) {
		
		var results = [];

		return courses.getAll().then(function(data) {
			
			var courses = data.data;
			courses
			.filter(function(d) {
				return d.title.toLowerCase().indexOf(val.toLowerCase()) >= 0;
			})
			.forEach(function(d) {
				results.push(
					{
						text: "course: " + d.title,
						title: d.title,
						url: "/courses/" + d._id
					
					}
				);
			});

			return breathers.getAll().then(function(data) {
				
				var breathers = data.data;
				breathers.filter(function(d) {
					return d.title.toLowerCase().indexOf(val.toLowerCase()) >= 0;
				})
				.forEach(function(d) {
					results.push(
						{
							text: "breather: " + d.title,
							title: d.title,
							url: "/breathers/" + d._id
						}
					);
				});
				return results;
			});
		});
	};


	$scope.onSelect = function($item, $model, $label) {
		console.log($item.url);
		$location.path($item.url).replace();
	};


}]);


