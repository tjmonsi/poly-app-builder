const gulp = require('gulp')
const compileHtml = require('./core/gulp/compile-html')

gulp.task('compile', function () {
  return gulp.src(['core/modules/**/**/*.html'])
    .pipe(compileHtml)
    .pipe(gulp.dest('dist/public/modules'))
})

gulp.task('default', gulp.series('compile'))
