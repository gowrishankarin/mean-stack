/* 
* @Author: Gowri Shankar
* @Date:   2016-01-26 19:37:40
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-26 23:16:29
*/

var assert = require('assert');
var express = require('express');
var fs = require('fs');
var status = require('http-status');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';
var PRODUCT_ID = '000000000000000000000001';

describe('Part 3 Assesments Tests', function() {
	var server;
	var app;
	var succeeded = 0;
	var finalCharge;

	var Category;
	var Config;
	var fx;
	var Product;
	var Stripe;
	var User;

	before(function() {
        var app = express();

        // Bootstrap server
        models = require('./models')(wagner);
        dependencies = require('./dependencies')(wagner);

        var deps = wagner.invoke(function(Category, fx, Product, Stripe, User, Config) {
        	return {
        		Category: Category,
        		fx: fx,
        		Product: Product,
        		Stripe: Stripe,
        		User: User,
        		Config: Config
        	};
        });



        // Make models available in tests
        Category = deps.Category;
        Config = deps.Config;
        fx = deps.fx;
        Product = deps.Product;
        Stripe = deps.Stripe;
        User = deps.User;

        app.use(function(req, res, next) {
            User.findOne({}, function(error, user) {
                assert.ifError(error);
                req.user = user;
                next();
            });
        });



        app.use(require('./api')(wagner));

        server = app.listen(3000);
	});

	after(function() {
    	// Shut the server down when we're done
        server.close();
	});

	beforeEach(function(done) {

    	// Make sure categories are empty before each test
        Category.remove({}, function(error) {
            assert.ifError(error);
            Product.remove({}, function(error) {
                assert.ifError(error);
                User.remove({}, function(error) {
                    assert.ifError(error);
                    done();
                });
            });
        });
	});

	beforeEach(function(done) {

		var categories = [
			{ _id: 'Electronics' },
			{ _id: 'Phones', parent: 'Electronics' },
			{ _id: 'Laptops', parent: 'Electronics' },
			{ _id: 'Bacon' }
		];

		var products = [
			{
				name: 'LG G4',
				category: { _id: 'Phones', ancestors: ['Electronics', 'Phones'] },
				price: {
					amount: 300,
					currency: 'USD'
				}
			},
			{
				_id: PRODUCT_ID,
				name: 'Asus Zenbook Prime',
				category: { _id: 'Laptops', ancestors: ['Electronics', 'Laptops'] },
				price: {
					amount: 2000,
					currency: 'USD'
				}
			},
			{
				name: 'Flying Pigs Farm Pasture Raised Pork Bacon',
				category: { _id: 'Bacon', ancestors: ['Bacon'] },
				price: {
					amount: 20,
					currency: 'USD'
				}
			}
		];

		var users = [{
			profile: {
				username: 'vkarpov15',
				picture: 'http://pbs.twimg.com/profile_images/550304223036854272/Wwmwuh2t.png'
			},
			data: {
				oauth: 'invalid',
				cart: []
			}
		}];

		Category.create(categories, function(error) {
			assert.ifError(error);
			Product.create(products, function(error) {
				assert.ifError(error);
				User.create(users, function(error) {
					assert.ifError(error);
					done();
				});
			});
		});
	});


	// Category
	it('can load a cateogry by id', function(done) {

		// Create a single category
		Category.create({ _id: 'Books'}, function(error, doc) {
			assert.ifError(error);
			var url = URL_ROOT + '/category/id/Books';

			superagent.get(url, function(error, res) {
				assert.ifError(error);
				var result;

				assert.doesNotThrow(function() {
					result = JSON.parse(res.text);
				});

				assert.ok(result.category);
				assert.equal(result.category._id, 'Books');
				done();
			});
		});
	});

	it('can load all categories that have a certain parent', function(done) {
		var categories = [
			{ _id: 'Cosmetics' },
			{ _id: 'Nail Polish', parent: 'Cosmetics' },
			{ _id: 'Talcum', parent: 'Cosmetics' },
			{ _id: 'Cleaning Agent' }
		];

		Category.create(categories, function(error, categories) {
			var url = URL_ROOT + '/category/parent/Cosmetics';
			superagent.get(url, function(error, res) {
				assert.ifError(error);
				var result;
				assert.doesNotThrow(function() {
					result = JSON.parse(res.text);
				});

				assert.equal(result.categories.length, 2);
				assert.equal(result.categories[1]._id, 'Talcum');
				assert.equal(result.categories[0]._id, 'Nail Polish');
				done();
			});
		});
	});

	// Product
	it('can load a product by id', function(done) {
		var PRODUCT_ID = '000000000000000000000002';
		var product = {
			name: 'LG G4',
			_id: PRODUCT_ID,
			price: {
				amount: 300,
				currency: 'USD'
			}
		};

		Product.create(product, function(error, doc) {
			assert.ifError(error);
			var url = URL_ROOT + '/product/id/' + PRODUCT_ID;

			superagent.get(url, function(error, res) {
				assert.ifError(error);
				var result;
				assert.doesNotThrow(function() {
					result = JSON.parse(res.text);
				});
				assert.ok(result.product);
				assert.equal(result.product._id, PRODUCT_ID);
				assert.equal(result.product.name, 'LG G4');
				done();
			});
		});
	});

	it('can load all products in a category with sub-categories', function(done) {
		var categories = [
			{_id: 'Shoes'},
			{ _id: 'Moccassins', parent: 'Shoes' },
			{ _id: 'Boat Shoes', parent: 'Shoes' },
			{ _id: 'Mint' }
		];

		var products = [
			{
				name: 'Cole Hann',
				category: {
					_id: 'Moccassins',
					ancestors: ['Shoes', 'Moccassins']
				},
				price: {
					amount: 300,
					currency: 'USD'
				}
			},
			{
				name: 'Crocs',
				category: {
					_id: 'Boat Shoes',
					ancestors: ['Shoes', 'Boat Shoes']
				},
				price: {
					amount: 2000,
					currency: 'USD'
				}
			},
			{
				name: 'Tic Tac',
				category: {
					_id: 'Mint',
					ancestors: ['Mint']
				},
				price: {
					amount: 20,
					currency: 'USD'
				}
			}
		];
		Category.create(categories, function(error, categories) {
			assert.ifError(error);
			Product.create(products, function(error, products) {
				assert.ifError(error);
				var url = URL_ROOT + '/product/category/Shoes';

				superagent.get(url, function(error, res) {
					assert.ifError(error);
					var result;
					assert.doesNotThrow(function() {
						result = JSON.parse(res.text);
					});
					assert.equal(result.products.length, 2);
					assert.equal(result.products[0].name, 'Cole Hann');
					assert.equal(result.products[1].name, 'Crocs');

					var url = URL_ROOT + '/product/category/Shoes?price=1';
					superagent.get(url, function(error, res) {
						assert.ifError(error);
						var result;
						assert.doesNotThrow(function() {
							result = JSON.parse(res.text);
						});
						assert.equal(result.products.length, 2);
						assert.equal(result.products[0].name, 'Cole Hann');
						assert.equal(result.products[1].name, 'Crocs');
						done();
					}); 
				});
			});
		});
	});

	// User
	it('can save users cart', function(done) {
		var url = URL_ROOT + '/me/cart';
		superagent.
		put(url).
		send({
		    data: {
		        cart: [{ product: PRODUCT_ID, quantity: 1 }]
		    }
		}).
		end(function(error, res) {
		    assert.ifError(error);
		    assert.equal(res.status, status.OK);
		    User.findOne({}, function(error, user) {
		        assert.ifError(error);
		        assert.equal(user.data.cart.length, 1);
		        assert.equal(user.data.cart[0].product, PRODUCT_ID);
		        assert.equal(user.data.cart[0].quantity, 1);
		        done();
		    });
		});
	});

	it('can load users cart', function(done) {
        var url = URL_ROOT + '/me';

        User.findOne({}, function(error, user) {
              assert.ifError(error);
              user.data.cart = [{ product: PRODUCT_ID, quantity: 1 }];
              user.save(function(error) {
                  assert.ifError(error);

                  superagent.get(url, function(error, res) {
                      assert.ifError(error);

                      assert.equal(res.status, 200);
                      var result;
                      assert.doesNotThrow(function() {
                          result = JSON.parse(res.text).user;
                      });
                      assert.equal(result.data.cart.length, 1);
                      assert.equal(result.data.cart[0].product.name, 'Asus Zenbook Prime');
                      assert.equal(result.data.cart[0].quantity, 1);
                      done();
                  });
              });
          });
	});

	// Stripe
	it('can check out', function(done) {
       var url = URL_ROOT + '/checkout';

        User.findOne({}, function(error, user) {
            assert.ifError(error);
            user.data.cart = [ { product: PRODUCT_ID, quantity: 1 }];
            user.save(function(error) {
                assert.ifError(error);

                superagent.
                    post(url).
                    send({
                        stripeToken: {
                            number: '4242424242424242',
                            cvc: '123',
                            exp_month: '12',
                            exp_year: '2017'
                        }
                    }).
                    end(function(error, res) {
                        assert.ifError(error);
                        assert.equal(res.status, 200);

                        var result;
                        assert.doesNotThrow(function() {
                          result = JSON.parse(res.text);
                        });

                        assert.ok(result.id);

                        Stripe.charges.retrieve(result.id, function(error, charge) {
                            assert.ifError(error);
                            assert.ok(charge);
                            assert.equal(charge.amount, 2000*100);
                            done();
                        });
                        done();
                    });
            });
        });
	});

	// Search
	it('can search by text', function(done) {
        var url = URL_ROOT + '/product/text/asus';
        superagent.get(url, function(error, res) {
            assert.ifError(error);
            assert.equal(res.status, status.OK);

            var results;
            assert.doesNotThrow(function() {
              results = JSON.parse(res.text).products;
            });
            assert.equal(results.length, 1);
            assert.equal(results[0]._id, PRODUCT_ID);
            assert.equal(results[0].name, 'Asus Zenbook Prime');
            done();
        }); 
	});

});