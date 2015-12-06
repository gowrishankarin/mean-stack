var fn = require('./myfile.js');
fn()

var otherFn = require('./test').other;
otherFn();

var requires = require('./requires');

requires.function_one();
requires.function_two();

var req_dirs = require('./req_dirs');

req_dirs.function_two();
req_dirs.function_one();

req_dirs.reqs_function_one();
req_dirs.reqs_function_two();
