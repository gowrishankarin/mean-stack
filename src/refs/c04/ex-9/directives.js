exports.addToCart = function() {
	return {
		controller: 'AddToCartController',
		templateUrl: '/ex-9/templates/add_to_cart.html'
	};
};

exports.categoryProducts = function() {
	return {
		controller: 'CategoryProductsController',
		templateUrl: '/ex-9/templates/category_products.html'
	};
};

exports.categoryTree = function() {
	return {
		controller: 'CategoryTreeController',
		templateUrl: '/ex-9/templates/category_tree.html'
	};
};

exports.checkout = function() {
	return {
		controller: 'CheckoutController',
		templateUrl: '/ex-9/templates/checkout.html'
	};
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