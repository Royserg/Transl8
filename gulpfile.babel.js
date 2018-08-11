import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import clean from 'gulp-clean-css';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';


gulp.task('static', () => {
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/assets/*')
    .pipe(gulp.dest('./dist/assets'));

  gulp.src('./src/manifest.json')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/popup/clipboard.min.js')
    .pipe(gulp.dest('./dist/popup'));
});

gulp.task('sass', () => {
  gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(clean())
    .pipe(gulp.dest('./dist'))
});

gulp.task('js', () => {
  gulp.src([
    './src/popup/languages.js',
    './src/popup/popup.js'
  ])
    .pipe(babel({ presets: 'env' }))
    .pipe(concat('popup.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/popup'));

  gulp.src('./src/content/content.js')
    .pipe(babel({ presets: 'env' }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/content'));
});

gulp.task('clean', () => {
  return del('./dist');
});

gulp.task('watch', ['default'], () => {
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch(['./src/**/*.html', './src/assets/*', './src/manifest.json'], ['static']);
});

gulp.task('build', ['clean'], () => {
  gulp.start(['static', 'sass', 'js'])
});

gulp.task('default', ['build']);