import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import clean from 'gulp-clean-css';

gulp.task('static', () => {
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', () => {
  gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(clean())
    .pipe(gulp.dest('./dist'))
});

gulp.task('clean', () => {
  return del('./dist');
})

gulp.task('build', ['clean'], () => {
  gulp.start(['static', 'sass'])
})

gulp.task('default', ['build']);