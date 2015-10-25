/* jshint camelcase:false */
var gulp = require('gulp');
var paths = require('./gulp.config.json');
var plug = require('gulp-load-plugins')();
var del = require('del');

var log = plug.util.log;

gulp.task('vendorjs', function() {
  log('Bundling, minifying, and copying the Vendor JavaScript');

  return gulp.src(paths.vendorjs)
    .pipe(plug.concat('vendor.min.js'))
    .pipe(plug.uglify())
    .pipe(gulp.dest(paths.build));
});

gulp.task('vendorcss', function() {
  log('Bundling, minifying, and copying the Vendor styles');

  return gulp.src(paths.vendorcss)
    .pipe(plug.concat('vendor.min.css'))
    .pipe(plug.minifyCss())
    .pipe(gulp.dest(paths.build + 'content'));
});

gulp.task('js', function() {
  log('Bundling, minifying, and copying JavaScript');

  var source = [].concat(paths.js); //, paths.build + 'templates.js'
  return gulp
      .src(source)
      .pipe(plug.sourcemaps.init()) // get screwed up in the file rev process
      .pipe(plug.concat('all.min.js'))
      .pipe(plug.ngAnnotate({
          add: true,
          single_quotes: true
      }))
      // .pipe(plug.bytediff.start())
      .pipe(plug.uglify({
          mangle: true
      }))
      // .pipe(plug.bytediff.stop(bytediffFormatter))
      .pipe(plug.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.build));

});

gulp.task('css', function() {
  log('Bundling, minifying, and copying styles');

  return gulp.src(paths.css)
    .pipe(plug.concat('all.min.css')) // Before bytediff or after
    .pipe(plug.autoprefixer('last 2 version', '> 5%'))
    // .pipe(plug.bytediff.start())
    .pipe(plug.minifyCss({}))
    // .pipe(plug.bytediff.stop(bytediffFormatter))
    .pipe(gulp.dest(paths.build + 'content'));
});

gulp.task('build', ['vendorjs', 'js', 'vendorcss', 'css'], function() {
  log('Building app...');
})

gulp.task('clean', function() {
    log('Cleaning: ' + paths.build);

    var delPaths = [].concat(paths.build);
    del(delPaths);
});
