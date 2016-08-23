'use strict';

var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	karmaServer = require('karma').Server,
	glob = require('glob'),

	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
			root: 'app',
			livereload: true,
			port: 8080
		});
	});

gulp.task('browserify', function() {
	return browserify('app/app.js', {debug: true})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('app'))
		.pipe(connect.reload());
});

gulp.task('browserify-tests', function() {
	var files = glob.sync('test/unit/**/*.js');
	return browserify({entries: files, debug: true})
		.bundle()
		.pipe(source('test-bundle.js'))
		.pipe(gulp.dest('test'));
});

gulp.task('unit', ['browserify-tests'], function(done) {
	new karmaServer({
			configFile: __dirname + '/karma.conf.js',
			singleRun: true
		}, done).start();
});

gulp.task('watch', function() {
	var files = glob.sync('test/unit/**/*.js')
		.concat([
			'!app/bundle.js',
			'!test/test-bundle.js',
			'app/views/**/*.js',
			'app/components/**/*.js',
			'app/services/**/*.js',
			'app/app.js'
		]);

	gulp.watch(files, ['browserify', 'unit'])
});

gulp.task('default', ['watch'], function() {
	gulp.start('connect');
});

