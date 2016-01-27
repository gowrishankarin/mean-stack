exports.CategoryTreeController = function($scope, $routeParams, $http) {
	var encoded = encodeURIComponent($routeParams.category);
	$http.
		get('/api/v1/category/id/' + encoded).
		success(function(data) {
			$scope.category = data.category;
			$http.
				get('/api/v1/category/id' + encoded).
				success(function(data) {
					$scope.children = data.categories;
				});
		});

		setTimeout(function() {
			$scope.$emit('CategoryTreeController');
		}, 0);
}

exports.UserMenuController = function($scope, $user) {
	$scope.user = $user;

	setTimeout(function() {
		$scope.$emit('UserMenuController');
	}, 0);
};


exports.ProductDetailsController = function($scope, $routeParams, $http) {
	var encoded = encodeURIComponent($routeParams.id);

	$http.
		get('/api/v1/product/id/' + encoded).
		success(function(data) {
			$scope.product = data.product;
		});

	setTimeout(function() {
		$scope.$emit('ProductDetailsController');
	}, 0);
};