'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var htmlGlob = './src/*.html';
var cssGlob = './src/*.css';
var assetsGlob = './src/assets/*.jpg';

gulp.task('html', function() {
    return gulp.src(htmlGlob)
        .pipe(gulp.dest('./build'));
});

gulp.task('css', function() {
    var postcss = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./src/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('./build'));
});

gulp.task('assets', function() {
    return gulp.src(assetsGlob)
        .pipe(gulp.dest('./build/assets'));
});

gulp.task('default', [ 'html', 'css' ]);
gulp.task('serve', function() {
    gulp.start( [ 'html', 'css', 'assets' ]);

    browserSync.init({
        server: "./build"
    });

    gulp.watch(htmlGlob, [ 'html' ])
        .on('change', browserSync.reload);
    gulp.watch(cssGlob, [ 'css' ])
        .on('change', browserSync.reload);
    gulp.watch(assetsGlob, [ 'assets' ])
        .on('change', browserSync.reload);
});
