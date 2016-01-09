/* 
* @Author: Gowri Shankar
* @Date:   2016-01-09 18:47:20
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-09 19:03:01
*/

'use strict';

var express = require('express');
var mongoose = require('mongoose');
var wagner = require('wagner-core');

setupModels(mongoose, wagner);

var app = express()

setupApp(app, wagner);

app.listen(3000);
console.log('Listening on port 3000');

function setupModels(mongoose, wagner) {
	mongoose.connect('mongodb://localhost:27017/test');

	var userSchema = new mongoose.Schema({
		name: String
	});

	var User = mongoose.model('User', userSchema);

	wagner.factory('User', function() {
		return User;
	});
}

function setupApp(app, wagner) {
	var routeHandler = wagner.invoke(function(User) {
		return function(req, res) {
			User.findOne({ _id: req.params.id }, function(error, user) {
				res.json({ user: user });
			});
		};
	});

	app.get('/user/:id', routeHandler);
}