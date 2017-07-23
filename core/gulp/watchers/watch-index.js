const gulp = require('gulp')
const {sources, buildConfigFile} = require('../utils/utils.js')

gulp.task('watch-index', gulp.parallel('compile-index', () => {
  gulp.watch([sources.index, `core/${buildConfigFile()}`], gulp.parallel('compile-index'))
}))
