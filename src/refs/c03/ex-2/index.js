/* 
* @Author: shankar
* @Date:   2016-01-09 17:38:31
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-09 17:44:09
*/

'use strict';

var server = require('./server');

server().listen(3000);
console.log('Server listening on port 3000!')