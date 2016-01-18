/* 
* @Author: Gowri Shankar
* @Date:   2016-01-10 00:37:15
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-18 21:10:59
*/
var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';


describe('Category API', function() {

	var server;
	var Category;
	var Product;

	before(function() {

		var app = express()
		models = require('./models')(wagner);
		app.use(require('./api')(wagner));

		server = app.listen(3000);

		Category = models.Category;
		Product = models.Product;

	});

	after(function() {
		server.close();
	});

	beforeEach(function(done) {
		Category.remove({}, function(error) {
			assert.ifError(error);
			Product.remove({}, function(error) {
				assert.ifError(error);
				done();
			});
		});
	});

	it('can load a product by id', function(done) {
		var PRODUCT_ID = '000000000000000000000000000001';
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
			{_id: 'Electronics'},
			{ _id: 'Phones', parent: 'Electronics' },
			{ _id: 'Laptops', parent: 'Electronics' },
			{ _id: 'Bacon' }
		];

		var products = [
			{
				name: 'LG G4',
				category: {
					_id: 'Phones',
					ancestors: ['Electronics', 'Phones']
				},
				price: {
					amount: 300,
					currency: 'USD'
				}
			},
			{
				name: 'Asus Zenbook Prime',
				category: {
					_id: 'Laptops',
					ancestors: ['Electronics', 'Laptops']
				},
				price: {
					amount: 2000,
					currency: 'USD'
				}
			},
			{
				name: 'Flying Pigs Farm Pasture Raised Pork Bacon',
				category: {
					_id: 'Bacon',
					ancestors: ['Bacon']
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
				var url = URL_ROOT + '/product/category/Electronics';

				superagent.get(url, function(error, res) {
					assert.ifError(error);
					var result;
					assert.doesNotThrow(function() {
						result = JSON.parse(res.text);
					});
					assert.equal(result.products.length, 2);
					assert.equal(result.products[0].name, 'Asus Zenbook Prime');
					assert.equal(result.products[1].name, 'LG G4');

					var url = URL_ROOT + '/product/category/Electronics?price=1';
					superagent.get(url, function(error, res) {
						assert.ifError(error);
						var result;
						assert.doesNotThrow(function() {
							result = JSON.parse(res.text);
						});
						assert.equal(result.products.length, 2);
						assert.equal(result.products[0].name, 'LG G4');
						assert.equal(result.products[1].name, 'Asus Zenbook Prime');
						done();
					}); 
				});
			});
		});
	});
});












