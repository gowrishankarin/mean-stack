/* 
* @Author: Gowri Shankar
* @Date:   2016-01-09 22:32:25
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-09 22:51:02
*/

'use strict';

var superagent = require('superagent');

superagent.get('http://www.google.com', function(err, res) {
	console.log(res.status);
	console.log(res.text);
});