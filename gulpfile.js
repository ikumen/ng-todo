'use strict';

var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
			root: 'app',
			livereload: true,
			port: 8080
		});
	});

gulp.task('browserify', function() {
	return browserify('app/todo-list-controller.js', {debug: true})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('app'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(['!app/bundle.js', 'app/todo-list-controller.js'], ['browserify'])
});

gulp.task('default', ['browserify','watch'], function() {
	gulp.start('connect');
});

