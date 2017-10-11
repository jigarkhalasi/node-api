'use strict';

var gulp = require('gulp');
var fs = require('fs');
var del = require('del');

/**
 *  This will load all js files in the gulp-tasks directory
 */
fs.readdirSync('gulp-tasks').forEach(function(file) {
  require('./gulp-tasks/' + file);
});

gulp.task('clean', function() {
  return del(['coverage', '.tmp', '.build','dist']);
});

gulp.task('default', gulp.series('clean', gulp.parallel(['server:default'])));
//gulp.task('test', gulp.parallel(['server:test']));
gulp.task('dist', gulp.series('clean', gulp.parallel(['server:dist'])));
