const gulp = require('gulp')
const correctBowerPath = require('../utils/correct-bower-path')
const {destinationFolder, sources} = require('../utils/utils.js')

gulp.task('compile-shell', () => {
  return gulp.src([sources.appShell])
    .pipe(correctBowerPath())
    .pipe(gulp.dest(`${destinationFolder()}/shell`))
})
