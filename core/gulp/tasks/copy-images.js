const gulp = require('gulp')
const {destinationFolder, sources} = require('../utils/utils')

gulp.task('copy-images', () => {
  return gulp.src(sources.images)
    .pipe(gulp.dest(`${destinationFolder()}/images`))
})
