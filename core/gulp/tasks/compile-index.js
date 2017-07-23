const gulp = require('gulp')
const hb = require('gulp-hb')
const {buildConfig, destinationFolder, sources} = require('../utils/utils')

gulp.task('compile-index', () => {
  const hbStream = hb({
    data: buildConfig()
  })
  return gulp.src(sources.index)
    .pipe(hbStream)
    .pipe(gulp.dest(destinationFolder()))
})
