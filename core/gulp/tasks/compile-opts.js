const gulp = require('gulp')
// const gulpif = require('gulp-if')
const correctBowerPath = require('../utils/correct-bower-path')
// const injectReducers = require('../utils/inject-reducers')
const {destinationFolder, sources} = require('../utils/utils.js')

gulp.task('compile-opts', () => {
  return gulp.src(sources.opts)
    .pipe(correctBowerPath())
    // .pipe(gulpif((file) => {
    //   return file.path.indexOf('state-manager.html') >= 0 && /\.html$/.test(file.path)
    // }, injectReducers()))
    .pipe(gulp.dest(`${destinationFolder()}/opts`))
})
