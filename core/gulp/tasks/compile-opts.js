const gulp = require('gulp')
const correctBowerPath = require('../utils/correct-bower-path')
const {destinationFolder, sources} = require('../utils/utils.js')

gulp.task('compile-opts', () => {
  return gulp.src([sources.opts])
    .pipe(correctBowerPath())
    .pipe(gulp.dest(`${destinationFolder()}/opts`))
})
