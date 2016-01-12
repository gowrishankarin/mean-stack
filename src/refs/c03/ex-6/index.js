/* 
* @Author: Gowri Shankar
* @Date:   2016-01-10 00:37:15
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-10 00:40:17
*/

'use strict';

var express = require('express');
var wagner = require('wagner-core');

require('./models')(wagner);

var app = express();

app.use('/api/v1', require('./api')(wagner));

app.listen(3000);
console.log('Listening on port 3000!');