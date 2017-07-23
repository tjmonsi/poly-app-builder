const gulp = require('gulp')
const tasks = [
  'clean-build',
  'copy-bower',
  'compile-index',
  'compile-modules-html',
  'compile-shell'
]

const watchers = [
  'watch-bower',
  'watch-index',
  'watch-shell',
  'watch-modules-html'
]

for (var i in tasks) {
  require(`./core/gulp/tasks/${tasks[i]}`)
}

for (var j in watchers) {
  require(`./core/gulp/watchers/${watchers[j]}`)
}

const series = gulp.series('clean-build', gulp.parallel('copy-bower', 'compile-index', 'compile-shell', 'compile-modules-html'))
const watch = gulp.series('clean-build', gulp.parallel('watch-bower', 'watch-index', 'watch-shell', 'watch-modules-html'))

gulp.task('default', series)
gulp.task('watch', watch)
gulp.task('build', gulp.series(series))
