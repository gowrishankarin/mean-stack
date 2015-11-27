var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
    gulp.
        src('src/refs/c01/mocha.js').
        pipe(mocha()).
        on('error', function(err){
            this.emit('end');
        });
});

gulp.task('watch', function() {
    gulp.watch('./src/refs/c01/*.js', ['test']);
});
