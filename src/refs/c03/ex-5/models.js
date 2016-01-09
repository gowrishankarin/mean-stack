/* 
* @Author: Gowri Shankar
* @Date:   2016-01-09 22:32:25
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-09 22:53:32
*/

'use strict';

var mongoose = require('mongoose');

module.exports = function(wagner) {
	mongoose.connect('mongodb://localhost:27017/test');

	var Category = mongoose.model('Category', require('./category'), 'categories');

	wagner.factory('Category', function() {
		return Category;
	});

	return {
		Category: Category
	};
};