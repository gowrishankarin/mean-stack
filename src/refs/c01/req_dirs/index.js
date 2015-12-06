var requires = require("./requires.js")

console.log("This index.js of req_dirs");


exports.function_one = function() {
    console.log("Function One of req_dirs/index.js")
}

exports.function_two = function() {
    console.log("Function Two of req_dir/index.js")
}

exports.reqs_function_one = requires.function_one;
exports.reqs_function_two = requires.function_two;
