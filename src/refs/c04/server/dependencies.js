/* 
* @Author: Gowri Shankar
* @Date:   2016-01-26 19:37:40
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-26 20:03:24
*/

var fs = require('fs');
var fx = require('./fx');
var Stripe = require('stripe');
var Config = require('./config.json')

module.exports = function(wagner) {
    var stripe =

    // TODO: Make Stripe depend on the Config service and use its `stripeKey`
    // property to get the Stripe API key.
    wagner.factory('Stripe', function() {
        return Stripe(Config.stripeKey);
    });

    wagner.factory('fx', fx);

    wagner.factory('Config', function() {
        return JSON.parse(fs.readFileSync('./config.json').toString());
    });
};
