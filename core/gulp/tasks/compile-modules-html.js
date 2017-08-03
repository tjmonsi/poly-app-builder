const gulp = require('gulp')
const gulpif = require('gulp-if')
const correctBowerPath = require('../utils/correct-bower-path')
const injectSharedStyle = require('../utils/inject-shared-style')
const {buildConfig, destinationFolder, sources} = require('../utils/utils.js')

gulp.task('compile-modules-html', () => {
  const config = buildConfig()
  return gulp.src(sources.modulesHtml)
    .pipe(correctBowerPath())
    .pipe(injectSharedStyle())
    .pipe(gulpif((chunk) => {
      const filePathArray = chunk.path.split('/')
      const moduleName = filePathArray.indexOf('src') + 1 === filePathArray.indexOf('modules')
          ? filePathArray[filePathArray.indexOf('src') + 2] : filePathArray[filePathArray.indexOf('modules') + 1]
      var modules = Object.assign({}, config.modules, sources.modules)
      return modules[moduleName]
    }, gulp.dest(`${destinationFolder()}/modules`)))
})
