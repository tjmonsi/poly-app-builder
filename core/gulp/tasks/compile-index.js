const gulp = require('gulp')
const hb = require('gulp-hb')
const {getVersion, buildName, buildConfig, destinationFolder, sources} = require('../utils/utils')

gulp.task('compile-index', () => {
  const hbStream = hb({
    data: Object.assign({}, buildConfig(), { build: buildName(), version: getVersion() }),
    helpers: {
      compileRouting: (options) => {
        return JSON.stringify(Object.assign({}, options.data.global.routing, options.data.global.httpCodes))
      },
      compileShellComponents: (options) => {
        return JSON.stringify(Object.assign({}, options.data.global.shellComponents))
      }
    }
  })
  return gulp.src(sources.index)
    .pipe(hbStream)
    .pipe(gulp.dest(destinationFolder()))
})
