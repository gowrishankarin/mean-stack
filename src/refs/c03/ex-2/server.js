/* 
* @Author: Gowri Shankar
* @Date:   2016-01-09 17:38:31
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-09 17:43:31
*/

'use strict';

var express = require('express')

module.exports = function() {
	var app = express()

	app.get('/', function(req, res) {
		res.send('Hello, world!');
	});

	app.get('/user/:user', function(req, res) {
		res.send('Page for user ' + req.params.user + ' with option ' +
			req.query.option)
	});

	return app;
};