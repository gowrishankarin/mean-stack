describe('Nav Bar', function() {
	var injector; 
	var element;
	var scope;
	var intercepts;
	var httpBackend;

	beforeEach(function() {
		injector = angular.injector(['mean-retail.components', 'ngMockE2E']);
		intercepts = {};

		injector.invoke(function($rootScope, $compile, $httpBackend) {
			
		});
	});

	if('shows logged in users profile picture', function(done) {
		httpBackend.expectGET('/api/v1/me').respond({

		});

		scope.$on('NavBarController', function() {

		});
	})
})