const gulp = require('gulp')
const {sources} = require('../utils/utils.js')

gulp.task('watch-modules-html', gulp.parallel('compile-modules-html', () => {
  gulp.watch([sources.modulesHtml], gulp.parallel('compile-modules-html'))
}))
