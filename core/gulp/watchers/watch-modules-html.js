const gulp = require('gulp')
const {sources, buildConfigFile} = require('../utils/utils.js')

gulp.task('watch-modules-html', gulp.parallel('compile-modules-html', () => {
  gulp.watch([sources.modulesHtml, `core/${buildConfigFile()}`], gulp.parallel('compile-modules-html'))
}))
