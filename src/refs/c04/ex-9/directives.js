exports.CategoryProducts = function() {
	return {
		controller: 'CategoryProductsController',
		templateUrl: '/ex-9/templates/category_products.html'
	}
}

exports.CategoryTree = function() {
	return {
		controller: 'CategoryTreeController',
		templateUrl: '/ex-9/templates/category_tree.html'
	}
};

exports.userMenu = function() {
	return {
		controller: 'UserMenuController',
		templateUrl: '/ex-9/templates/user_menu.html'
	};
};

exports.productDetails = function() {
	return {
		controller: 'ProductDetailsController',
		templateUrl: '/ex-9/templates/product_details.html'
	};
};