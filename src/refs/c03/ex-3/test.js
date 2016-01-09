/* 
* @Author: Gowri Shankar
* @Date:   2016-01-09 18:02:58
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-09 18:34:13
*/

'use strict';

var app = require('./server.js');
var assert = require('assert');
var superagent = require('superagent');

describe('server', function() {
	var server;

	beforeEach(function() {
		server = app().listen(3000);
	});

	afterEach(function() {
		server.close();
	});

	it('prints out "Hello, world" when user goes to /', function(done) {
		superagent.get('http://localhost:3000/', function(error, res) {
			assert.ifError(error);
			assert.equal(res.status, 200);
			assert.equal(res.text, "Hello, world!");
			done();
		});
	});
});