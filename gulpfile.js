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

gulp.task('sass', function() {
  return gulp.src('app/content/sass/**/*.scss')
    .pipe(plug.sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('app/content'));
});

gulp.task('watch', function() {
  gulp.watch('app/content/sass/**/*.scss', ['sass']);
});

gulp.task('templatecache', function() {
  log('Creating an AngularJS $templateCache');

  return gulp
      .src(paths.htmltemplates)
      // .pipe(plug.bytediff.start())
      .pipe(plug.minifyHtml({
          empty: true
      }))
      // .pipe(plug.bytediff.stop(bytediffFormatter))
      .pipe(plug.angularTemplatecache('templates.js', {
          module: 'app',
          standalone: false,
          root: 'views/'
      }))
      .pipe(gulp.dest(paths.build));
});

gulp.task('js', ['templatecache'], function() {
  log('Bundling, minifying, and copying JavaScript');

  var source = [].concat(paths.js); //, paths.build + 'templates.js'
  return gulp
      .src(source)
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

gulp.task('fonts', function() {
    var dest = paths.build + 'fonts';
    log('Copying fonts');
    return gulp
        .src(paths.fonts)
        .pipe(gulp.dest(dest));
});

gulp.task('rev-and-inject', ['js', 'vendorjs', 'css', 'vendorcss'], function() {
    log('Rev\'ing files and building index.html');

    var minified = paths.build + '**/*.min.*';
    var index = paths.client + 'index.html';
    var minFilter = plug.filter(['**/*.min.*', '!**/*.map']);
    var indexFilter = plug.filter(['index.html']);

    var stream = gulp
        // Write the revisioned files
        .src([].concat(minified, index)) // add all built min files and index.html
        .pipe(minFilter) // filter the stream to minified css and js
        .pipe(plug.rev()) // create files with rev's
        .pipe(gulp.dest(paths.build)) // write the rev files
        .pipe(minFilter.restore()) // remove filter, back to original stream

    // inject the files into index.html
    .pipe(indexFilter) // filter to index.html
    .pipe(inject('content/vendor.min.css', 'inject-vendor'))
        .pipe(inject('content/all.min.css'))
        .pipe(inject('vendor.min.js', 'inject-vendor'))
        .pipe(inject('all.min.js'))
        .pipe(gulp.dest(paths.build)) // write the rev files
    .pipe(indexFilter.restore()) // remove filter, back to original stream

    // replace the files referenced in index.html with the rev'd files
    .pipe(plug.revReplace()) // Substitute in new filenames
    .pipe(gulp.dest(paths.build)) // write the index.html file changes
    .pipe(plug.rev.manifest()) // create the manifest (must happen last or we screw up the injection)
    .pipe(gulp.dest(paths.build)); // write the manifest

    function inject(path, name) {
        var pathGlob = paths.build + path;
        var options = {
            ignorePath: paths.build.substring(1),
            read: false
        };
        if (name) {
            options.name = name;
        }
        return plug.inject(gulp.src(pathGlob), options);
    }
});

gulp.task('build', ['rev-and-inject', 'fonts'], function() {
  log('Building app...');
})

gulp.task('clean', function() {
  log('Cleaning: ' + paths.build);
  var delPaths = [].concat(paths.build);
  del(delPaths);
});
