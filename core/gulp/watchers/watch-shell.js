const gulp = require('gulp')
const {sources} = require('../utils/utils.js')

gulp.task('watch-shell', gulp.parallel('compile-shell', () => {
  gulp.watch(sources.appShell, gulp.parallel('compile-shell'))
}))
