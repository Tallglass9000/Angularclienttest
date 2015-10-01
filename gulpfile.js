var gulp = require('gulp');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var Karma = require('karma').Server;

debugger; // first 
gulp.task('webpack:dev', function() {
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  debugger; // about to run webpack:test
  return gulp.src('./test/client/entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/client'));
    debugger; // end webpack:test
});

gulp.task('staticfiles:dev', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'))
});

gulp.task('servertests', function() {
  debugger; // start server test
  return gulp.src('./test/api_test/**/*tests.js')
    .pipe(mocha({reporter: 'nyan'}))
    .once('error', function(err) {
      console.log(err);
      process.exit(1);
    })
    .once('end', function() {
      if (this.seq.length === 1 && this.seq[0] === 'servertests')
        process.exit();
    }.bind(this));
    // end server test;
});

gulp.task('karmatests', ['webpack:test'], function(done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('tests', ['karmatests', 'servertests'], function () {
  return gulp.src('./test/api_test/**/*tests.js')
  .once('end', function() {
    console.log(this.seq.length);
    console.log(this.seq);
    if (this.seq.length === 4 && this.seq[3] === 'tests')
      process.exit();
  }.bind(this));
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);

