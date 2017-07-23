const gulp = require('gulp')

module.exports = (watchers) => {
  for (var i in watchers) {
    gulp.task(watchers[i].name, gulp.parallel(watchers[i].tasks, () => {
      gulp.watch(watchers[i].files, gulp.parallel(watchers[i].tasks))
    }))
  }
}
