const gulp = require('gulp')

module.exports = (watchers) => {
  watchers.forEach((item) => {
    gulp.task(item.name, gulp.parallel(item.tasks, (done) => {
      console.log(item.name, item.files, item.tasks)
      gulp.watch(item.files, gulp.parallel(item.tasks))
      done()
    }))
  })

}
