/* 
* @Author: Gowri Shankar
* @Date:   2016-01-26 19:37:40
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-26 21:47:42
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

	});

	after(function() {

	});

	beforeEach(function(done) {

	});

	beforeEach(function(done) {

	});


	/*Category*/
	it('can load a cateogry by id', function(done) {

	});

	it('can load all categories that have a certain parent', function(done) {

	});

	/* Product */
	it('can load a product by id', function(done) {

	});

	it('can load all products in a category with sub-categories', function(done) {

	});

	/* User */
	it('can save users cart', function(done) {

	});

	it('can load users cart', function(done) {

	});

	/* Stripe */
	it('can check out', function(done) {

	});

	/* Search */
	it('can search by text', function(done) {

	});

});