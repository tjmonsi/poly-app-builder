const gulp = require('gulp')
const gulpif = require('gulp-if')
const correctBowerPath = require('../utils/correct-bower-path')
const {buildConfig, destinationFolder, sources} = require('../utils/utils.js')

gulp.task('compile-modules-html', () => {
  const config = buildConfig()
  return gulp.src([sources.modulesHtml])
    .pipe(correctBowerPath())
    .pipe(gulpif((chunk) => {
      const filePathArray = chunk.path.split('/')
      const moduleName = filePathArray.indexOf('core') + 1 === filePathArray.indexOf('modules')
          ? filePathArray[filePathArray.indexOf('core') + 2] : filePathArray[filePathArray.indexOf('modules') + 1]
      return config.modules[moduleName]
    }, gulp.dest(`${destinationFolder()}/modules`)))
})
