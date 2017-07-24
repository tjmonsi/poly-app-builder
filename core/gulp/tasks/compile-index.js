const gulp = require('gulp')
const hb = require('gulp-hb')
const {buildConfig, destinationFolder, sources} = require('../utils/utils')

gulp.task('compile-index', () => {
  const hbStream = hb({
    data: buildConfig(),
    helpers: {
      compileRouting: (options) => {
        return JSON.stringify(Object.assign({}, options.data.global.routing, options.data.global.httpCodes))
      }
    }
  })
  return gulp.src(sources.index)
    .pipe(hbStream)
    .pipe(gulp.dest(destinationFolder()))
})
