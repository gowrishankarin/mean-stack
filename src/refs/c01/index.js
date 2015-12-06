var fn = require('./myfile.js');
fn()

var otherFn = require('./test').other;
otherFn();

var requires = require('./requires');

requires.function_one();
requires.function_two();

var req_dirs = require('./req_dirs');

var req_dirs_index = require('./req_dirs');

req_dirs.function_two();
req_dirs.function_one();
