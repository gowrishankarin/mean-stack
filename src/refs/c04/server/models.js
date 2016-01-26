/* 
* @Author: Gowri Shankar
* @Date:   2016-01-26 19:37:40
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-26 19:42:25
*/

var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
    mongoose.connect('mongodb://localhost:27017/test');

    wagner.factory('db', function() {
    	return mongoose;
    });

    var Category =
        mongoose.model('Category', require('./category'), 'categories');
    var Product =
        mongoose.model('Product', require('./product'), 'products');
    var User =
        mongoose.model('User', require('./user'), 'users');

    var models = {
        Category: Category,
        Product: Product,
        User: User
    };

    // To ensure DRY-ness, register factories in a loop
    _.each(models, function(value, key) {
        wagner.factory(key, function() {
            return value;
        });
    });

    return models;
};
