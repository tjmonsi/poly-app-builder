const gulp = require('gulp')
const hb = require('gulp-hb')
const {buildConfig, destinationFolder} = require('../utils/utils')

gulp.task('compile-index', () => {
  const hbStream = hb({
    data: buildConfig()
  })
  return gulp.src('core/root/index.html')
    .pipe(hbStream)
    .pipe(gulp.dest(destinationFolder()))
})
