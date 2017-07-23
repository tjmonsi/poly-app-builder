const gulp = require('gulp')
const {destinationFolder} = require('../utils/utils')

console.log('copy-bower')
gulp.task('copy-bower', () => {
  return gulp.src('bower_components/**/*.*')
    .pipe(gulp.dest(`${destinationFolder()}/bower_components`))
})
