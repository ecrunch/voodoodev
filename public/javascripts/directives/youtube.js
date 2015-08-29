
var app = angular.module('youtubeDirective', []);
/*
app.directive('myYoutube', function($sce) {
	return {
		restrict: 'EA',
        scope: {
			source: '='
		    },
		replace: true,
		template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
		link: function (scope) {
			scope.$watch('source', function (newVal) {
				if (newVal) {
					scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           			}
			});
		}
	};

});*/	
		
	
