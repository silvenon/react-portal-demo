import gulp from 'gulp';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';

const bs = browserSync.create();

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';

let b = browserify({
  entries: ['./app/scripts/app.jsx'],
  extensions: ['.jsx'],
  debug: true
}, watchify.args);

// only watch for changes in development mode
if (process.env.GULP_ENV !== 'production') {
  b = watchify(b);
}

function bundle() {
  return b.bundle()
    .on('error', msg => {
      delete msg.stream;
      gutil.log(msg);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(bs.stream({once: true}));
}

gulp.task('scripts', bundle);
b.on('update', bundle);

gulp.task('connect:dev', ['scripts', 'styles'], done => {
  bs.init({
    notify: false,
    port: 9000,
    open: false,
    server: {
      baseDir: ['.tmp', 'app']
    }
  }, done);
});

gulp.task('watch:dev', ['connect:dev'], () => {
  gulp.watch([
    'app/index.html'
  ]).on('change', bs.reload);
});

gulp.task('serve:dev', ['connect:dev', 'watch:dev']);
