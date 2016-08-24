'use strict';

var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	karmaServer = require('karma').Server,
	protractor = require('gulp-protractor').protractor,
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

function globPatterns(patterns, excludes) {
	var files = [], ignores = {};
	// create has of excludes for easier lookup
	[].concat(excludes).forEach(function(ex) {
		ignores[ex] = true;
	});
	// glob each pattern, then filter through excludes
	[].concat(patterns).forEach(function(pattern) {
			glob.sync(pattern).forEach(function(file) {
				if(!ignores[file]) {
					files.push(file);
				}
			});
	});
	return files;
}

gulp.task('browserify-tests', function() {
	var files = globPatterns(['app/**/*.js', 'test/unit/**/*.js'],
		['app/bundle.js', 'test/unit/test-bundle.js']);

	return browserify({entries: files, debug: true})
		.bundle()
		.pipe(source('test-bundle.js'))
		.pipe(gulp.dest('test/unit'));
});

gulp.task('unit', ['browserify-tests'], function(done) {
	new karmaServer({
			configFile: __dirname + '/karma.conf.js',
			singleRun: true
		}, done).start();
});

gulp.task('watch-e2e', function() {
	var files = globPatterns(['test/e2e/**/*.js']);
	gulp.watch(files, ['e2e'])
});

gulp.task('e2e', function() {
	return gulp
		.src('test/e2e/**/*.js')
		.pipe(protractor({
				configFile: __dirname + '/protractor.conf.js',
				args: ['--baseUrl', 'http://localhost:8080']
			}
		))
		.on('error', function(e) { throw e; });
});

gulp.task('watch', function() {
	var files = globPatterns(['app/**/*.js', 'test/unit/**/*.js'],
		['app/bundle.js', 'test/unit/test-bundle.js']);

	gulp.watch(files, ['browserify', 'unit', 'e2e'])
});

gulp.task('default', ['browserify', 'unit', 'watch'], function() {
	gulp.start('connect');
});

