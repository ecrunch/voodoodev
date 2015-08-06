
var app = angular.module('sessionService', []);

app.factory('Session', [

'$http', 'auth',

function($http, auth) {

	var service = {
		progressTrackers: 		[],
		progressTrackerIds:	[],
		breathers: 	[],
		breatherIds:	[]
	};


	// TODO : make a route function that grabs everything
	service.initializeEverything = function() {
		return service.initializeProgressTrackers().then(function() {
			return service.initializeBreathers().then(function() {
					return;
				});
			});
		};
	


	service.initializeProgressTrackers = function() {
		return $http.post('/user/progressTrackers/', null, {
			headers: {
				Authorization: 'Bearer ' + auth.getToken()
			}
		})
		.then(	
			// success
			function(data) {
				service.progressTrackers 	= data.data.progressTrackers;
				service.progressTrackerIds = data.data.progressTrackerIds;
                console.log(data);
                return data;
			},
			//fail
			function(err) {
				console.log(err);
				return;
			}
		);
	};

	service.initializeBreathers = function() {
		return $http.post('/user/breathers/', null, {
			headers: {
				Authorization: 'Bearer ' + auth.getToken()
			}
		})
		.then(	
			// success
			function(data) {
				service.breathers = data.data.breathers;
				service.breatherIds = data.data.breatherIds;
				return data;
			},
			//fail
			function(err) {
				console.log(err);
				return;
			}
		);
	};




	return service;

}]);
