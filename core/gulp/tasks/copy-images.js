const gulp = require('gulp')
const {destinationFolder} = require('../utils/utils')

gulp.task('copy-images', () => {
  return gulp.src(['images/**/*.*', 'images/*.*'])
    .pipe(gulp.dest(`${destinationFolder()}/images`))
})
