const gulp = require('gulp')

module.exports = (watchers) => {
  watchers.forEach((item) => {
    gulp.task(item.name, gulp.parallel(item.tasks, (done) => {
      const watcher = gulp.watch(item.files, gulp.parallel(item.tasks))
      watcher.on('change', (path, stats) => {
        console.log('File ' + path + ' was changed')
      })
      done()
    }))
  })
}
