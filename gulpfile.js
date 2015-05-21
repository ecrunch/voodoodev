var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bootlint  = require('gulp-bootlint');
    map = require('gulp-map'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    jasmine = require('gulp-jasmine');
    livereload = require('gulp-livereload'),
    _paths = ['server/**/*.js','app.js','public/**/*.js','routes/**/*.js','views/*.js'];




gulp.task('start', function () {
  livereload.listen()
  nodemon({
    script: 'server/index.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
    , stdout: false
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^listening/.test(chunk)) {
        livereload.reload()
      }
    process.stdout.write(chunk)
  })
 
  })

})

gulp.task('lint', function () {
  return gulp.src(_paths)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('bootlint', function() {
    return gulp.src('.views/index.html')
        .pipe(bootlint());
});

gulp.task('mocha', function () {
    return gulp.src('test/test.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('jasmine', function () {
    return gulp.src('spec/test.js')
        .pipe(jasmine());
});


gulp.task('default', ['start','lint','mocha','jasmine','bootlint']);

