/* 
* @Author: Gowri Shankar
* @Date:   2016-01-09 22:32:05
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-18 19:33:17
*/

'use strict';

var express = require('express');
var wagner = require('wagner-core');

require('./models')(wagner);

var app = express();

app.use('/api/v1', require('./api')(wagner));

app.use('/api/v2', require('./api')(wagner));

app.listen(3000);
console.log('Listening on port 3000!');