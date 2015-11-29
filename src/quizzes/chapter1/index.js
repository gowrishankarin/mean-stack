var mongodb = require('mongodb');
var movies = require('./movies');

dbInterface = require('./interface.js')

var _ = require('underscore');
var assert = require('assert');
var uri = 'mongodb://localhost:27017//movies';





mongodb.MongoClient.connect(uri, function(error, db) {
    if(error) {
        console.log(error);
        process.exit(1);
    }

    _.each(movies.movies, function(aMovie) {
        dbInterface.insert(db, aMovie, function(error) {
            assert.ifError(error)
        });
    });

});
