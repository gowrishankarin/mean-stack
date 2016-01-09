/* 
* @Author: Gowri Shankar
* @Date:   2016-01-09 17:38:44
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-09 17:58:39
*/

'use strict';

var express = require('express');

var app = express()

app.get('/', function(req, res) {
	res.send("Hello, world!");
});

app.get("/user/:user", function(req, res) {
	res.send('Page for user ' + req.params.user + ' with option ' + req.query.option)
});

app.listen(3000)
console.log("Server listening on port 3000!")