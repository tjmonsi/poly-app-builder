const gulp = require('gulp')
const del = require('del')
const {destinationFolder} = require('../utils/utils.js')

gulp.task('clean-build', () => {
  return del([destinationFolder()])
})
