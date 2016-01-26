/* 
* @Author: Gowri Shankar
* @Date:   2016-01-26 19:37:40
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-26 19:57:40
*/
var mongoose = require('mongoose');

var categorySchema = {
  	_id: { type: String },
	parent: {
	    type: String,
	    ref: 'Category'
	},
	ancestors: [{
	    type: String,
	    ref: 'Category'
	}]
};

module.exports = new mongoose.Schema(categorySchema);
module.exports.categorySchema = categorySchema;