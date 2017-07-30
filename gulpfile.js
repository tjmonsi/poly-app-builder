const gulp = require('gulp')
const fs = require('fs')
const {sources, buildConfigFile, destinationFolder} = require('./core/gulp/utils/utils')
const setupWatchers = require('./core/gulp/utils/setup-watchers')
const tasks = [
  'clean-build',
  'copy-bower',
  'compile-index',
  'compile-manifest',
  'compile-shell',
  'compile-opts',
  'compile-modules-html',
  'generate-sw',
  'polymer-build',
  'browserify'
]

const compilerTasks = []

const watchers = [
  {
    name: 'watch-bower',
    files: sources.bower,
    tasks: 'copy-bower'
  },
  {
    name: 'watch-browserify',
    files: sources.browserify,
    tasks: 'browserify'
  },
  {
    name: 'watch-index',
    files: [sources.index, `core/${buildConfigFile()}`],
    tasks: 'compile-index'
  },
  {
    name: 'watch-manifest',
    files: `core/${buildConfigFile()}`,
    tasks: 'compile-manifest'
  },
  {
    name: 'watch-shell',
    files: [sources.appShell, `core/${buildConfigFile()}`],
    tasks: 'compile-shell'
  },
  {
    name: 'watch-opts',
    files: sources.opts,
    tasks: 'compile-opts'
  },
  {
    name: 'watch-modules-html',
    files: [sources.modulesHtml, `core/${buildConfigFile()}`],
    tasks: 'compile-modules-html'
  }
]

for (var i in tasks) {
  require(`./core/gulp/tasks/${tasks[i]}`)
  if (tasks[i] !== 'clean-build' && tasks[i] !== 'generate-sw' && tasks[i] !== 'polymer-build') {
    compilerTasks.push(tasks[i])
  }
}

require('./core/gulp/tasks/create-module')
require('./core/gulp/tasks/create-page')

setupWatchers(watchers)

const createFolder = (done) => {
  fs.mkdirSync(destinationFolder())
  done()
}

const generateSW = (done) => {
  fs.writeFileSync(`${destinationFolder()}/service-worker.js`, 'console.log("Development version. Will not cache files")', 'utf8')
  done()
}

const series = gulp.series('clean-build', createFolder, gulp.parallel(compilerTasks))
const watch = gulp.series('clean-build', createFolder, generateSW, gulp.parallel(watchers.map((w) => (w.name))))

gulp.task('default', gulp.series(series, generateSW))
gulp.task('watch', watch)
gulp.task('build', gulp.series(series, 'polymer-build', 'generate-sw'))
