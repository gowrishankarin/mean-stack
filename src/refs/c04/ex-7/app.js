var app = angular.module('myApp', ['ng']);

app.directive('userMenu', function() {
	return {
		controller: 'MyHttpController',
		templateUrl: './template.html'
	}
});

app.controller('MyHttpController', function($scope, $http) {
	$http.get('/api/v1/me').success(function(data) {
		$scope.user = data.user;
	});

	setTimeout(function() {
		$scope.$emit('MyHttpController');
	}, 0);
});