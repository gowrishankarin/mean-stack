/* 
* @Author: Gowri Shankar
* @Date:   2016-01-26 19:37:40
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-26 19:52:13
*/

var express = require('express');
var wagner = require('wagner-core');

require('./models')(wagner);
require('./dependencies')(wagner);

var app = express();

wagner.invoke(require('./auth'), { app: app });

app.use('/api/v1', require('./api')(wagner));

app.use(express.static('../', {
	maxAge: 4 * 60 * 60 * 1000
}));

app.listen(3000);
console.log('Listening on port 3000!');