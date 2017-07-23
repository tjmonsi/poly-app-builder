const gulp = require('gulp')
const {sources} = require('../utils/utils.js')

gulp.task('watch-bower', gulp.parallel('copy-bower', () => {
  gulp.watch(sources.bower, gulp.parallel('copy-bower'))
}))
