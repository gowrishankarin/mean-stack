var assert = require('assert');

describe('my feature', function() {
    it('works', function() {
        assert.equal('A', 'A');
    });
    it('fails gracefully', function() {
        assert.throws(function() {
            throw 'Error';
        });
    });
});

describe('my other feature', function() {
    it('async', function(done) {
        setTimeout(function() {
            done();
        }, 25);
    });
});


/*
How to Run These Tests?
../../../node_modules/.bin/mocha mocha.js
../../../node_modules/.bin/mocha -g "fail" mocha.js
../../../node_modules/.bin/mocha -g "other" mocha.js

../../../node_modules/.bin/mocha -R dot mocha.js
../../../node_modules/.bin/mocha -R xunit mocha.js
../../../node_modules/.bin/mocha -R nyan mocha.js
*/
