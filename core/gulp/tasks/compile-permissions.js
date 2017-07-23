const gulp = require('gulp')
const correctBowerPath = require('../utils/correct-bower-path')
const {destinationFolder, sources} = require('../utils/utils.js')

gulp.task('compile-permissions', () => {
  return gulp.src([sources.permissions])
    .pipe(correctBowerPath())
    .pipe(gulp.dest(`${destinationFolder()}/permissions`))
})
