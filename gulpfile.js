'use strict';

const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect');
const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const watchify = require('watchify');


//
// Settings
//
const dev = './dev';
const src = './src';



//
// Sass
//
gulp.task('sass', () => {
	gulp.src(`${src}/sass/main.scss`)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(`${dev}/css/`))
		.pipe(connect.reload());
});
gulp.task('sass:watch', () => {
	gulp.watch(`${src}/sass/**/*.scss`, ['sass']);
});


//
// Browserify
//
gulp.task('browserify', () => {
	const input = 'main.js';
	const output = 'bundle.js';

	const bundler = watchify(browserify(Object.assign({}, watchify.args, {
		debug: true,
		entries: [`${src}/js/${input}`]
	})))
		.transform(babelify);


	bundler.on('log', gutil.log);
	bundler.on('update', bundle);


	function bundle() {
		return bundler
			.bundle()
			.on('error', gutil.log)
			.pipe(source(output))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(`${dev}/js`))
			.pipe(connect.reload()); // Livereload
	}

	return bundle();
});


//
// Connect 
//
gulp.task('connect', () => {
	connect.server({
		root: dev,
		livereload: true
	});
});


//
// Tasks
//
gulp.task('server', ['connect', 'browserify', 'sass:watch']);
