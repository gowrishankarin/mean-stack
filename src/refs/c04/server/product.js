/* 
* @Author: Gowri Shankar
* @Date:   2016-01-26 19:37:40
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-26 23:19:21
*/

var mongoose = require('mongoose');
var Category = require('./category');
var fx = require('./fx');

module.exports = function(db, fx) {
	var productSchema = {
		name: { type: String, required: true },
		// Pictures must start with "http://"
		pictures: [{ type: String, match: /^http:\/\//i }],
		price: {
			amount: {
				type: Number,
				required: true,
				set: function(v) {
					this.internal.approximatePriceUSD =
					  v / (fx()[this.price.currency] || 1);
					return v;
				}
			},
			// Only 3 supported currencies for now
			currency: {
				type: String,
				enum: ['USD', 'EUR', 'GBP'],
				required: true,
				set: function(v) {
					this.internal.approximatePriceUSD =
					  this.price.amount / (fx()[v] || 1);
					return v;
				}
			}
		},
		category: Category.categorySchema,
		internal: {
			approximatePriceUSD: Number
		}
	};

	var schema = new mongoose.Schema(productSchema);
	schema.index({ name: 'text' });

	var currencySymbols = {
		'USD': '$',
		'EUR': '€',
		'GBP': '£'
	};

	/*
	 * Human-readable string form of price - "$25" rather
	 * than "25 USD"
	 */
	schema.virtual('displayPrice').get(function() {
		return currencySymbols[this.price.currency] +
			'' + this.price.amount;
	});

	schema.set('toObject', { virtuals: true });
	schema.set('toJSON', { virtuals: true });

	return db.model('Product', schema, 'products');

};

