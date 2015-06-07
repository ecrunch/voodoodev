
var app = angular.module('scheduleItemDirective', []);

app.directive('scheduleItem', function() {


	function link(scope, element, attrs) {
		console.log(scope.item);
	}



	return {
		restrict: 'E',
		templateUrl: '../../temps/directive_partials/scheduleItemDirective.html',
		scope: {
			item: '=item'
		},
		link: link
	}

});


