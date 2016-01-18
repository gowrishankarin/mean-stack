/* 
* @Author: Gowri Shankar
* @Date:   2016-01-10 00:37:15
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-18 19:56:16
*/
var obj = { a: 1 };

var testWithP1 = test.bind(obj, 'first parameter');

testWithP1('second parameter');

function test(p1, p2) {
	console.log('This = ' + require('util').inspect(this));
	console.log('p1 = ' + p1);
	console.log('p2 = ' + p2);
}