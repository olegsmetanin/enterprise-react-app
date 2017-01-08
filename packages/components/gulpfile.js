'use strict';

var gulp = require('gulp'),
    webpack = require('webpack'),
    gutil = require('gutil'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    jshint = require('gulp-jshint'),
    eslint = require('gulp-eslint'),
    tslint = require('gulp-tslint');

process.env.NODE_ENV = 'development';

gulp.task('clean', function() {
    return gulp.src(['dist']).pipe(clean());
});

gulp.task('tslint', function() {
    return gulp.src([
            'src/**/*.ts',
            'src/**/*.tsx',
            'test/**/*.ts',
            'test/**/*.tsx'
        ])
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report());
});

gulp.task('lint', function(done) {
    runSequence('tslint', done);
});

gulp.task('copy', function() {
    return gulp.src(['webpublic/**/*']).pipe(gulp.dest('dist'));
});

gulp.task('copy-vendors', function() {
    return gulp.src(['node_modules/enterprise-react-app-vendors/dist/**/*']).pipe(gulp.dest('dist/vendors'));
});

gulp.task('compile', function(done) {
    process.env.NODE_ENV = 'production';
    var webpackConfig = require('./webpack.config.js');
    webpack(webpackConfig, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        done();
    });
});

gulp.task('rundevserver', function() {
    require('./devserver.js');
});

gulp.task('run', function(done) {
    runSequence('clean', ['copy', 'copy-vendors', 'rundevserver'], done);
});

gulp.task('build', function(done) {
    runSequence('clean', ['copy', 'copy-vendors', 'compile'], done);
});

gulp.task('default', ['build']);