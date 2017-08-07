const gulp = require('gulp')
const fs = require('fs')
const { spawn } = require('child_process')
const {sources, buildConfigFile, destinationFolder} = require('./core/gulp/utils/utils')
const setupWatchers = require('./core/gulp/utils/setup-watchers')
const tasks = [
  'clean-build',
  'copy-bower',
  'compile-index',
  'compile-404',
  'compile-manifest',
  'compile-shell',
  'compile-opts',
  'compile-modules-html',
  'generate-sw',
  'polymer-build',
  'browserify',
  'compile-sass',
  'copy-images',
  'compile-firebase',
  'compile-firebase-json'
]

const compilerTasks = []

const watchers = [
  {
    name: 'watch-bower',
    files: sources.bower,
    tasks: 'copy-bower'
  },
  {
    name: 'watch-images',
    files: sources.images,
    tasks: 'copy-images'
  },
  {
    name: 'watch-browserify',
    files: sources.browserify,
    tasks: 'browserify'
  },
  {
    name: 'watch-sass',
    files: sources.sass,
    tasks: 'compile-sass'
  },
  {
    name: 'watch-index',
    files: [sources.index, `src/${buildConfigFile()}`],
    tasks: 'compile-index'
  },
  {
    name: 'watch-manifest',
    files: `core/${buildConfigFile()}`,
    tasks: 'compile-manifest'
  },
  {
    name: 'watch-shell',
    files: [sources.appShell, `src/${buildConfigFile()}`],
    tasks: 'compile-shell'
  },
  {
    name: 'watch-opts',
    files: sources.opts,
    tasks: 'compile-opts'
  },
  {
    name: 'watch-modules-html',
    files: [sources.modulesHtml, `src/${buildConfigFile()}`],
    tasks: 'compile-modules-html'
  },
  {
    name: 'watch-firebase',
    files: `core/${buildConfigFile()}`,
    tasks: 'compile-firebase'
  }
]

for (var i in tasks) {
  require(`./core/gulp/tasks/${tasks[i]}`)
  if (tasks[i] !== 'clean-build' && tasks[i] !== 'generate-sw' && tasks[i] !== 'polymer-build' && tasks[i] !== 'bower-install' && tasks[i] !== 'compile-firebase-json') {
    compilerTasks.push(tasks[i])
  }
}

require('./core/gulp/tasks/create-module')
require('./core/gulp/tasks/delete-module')
require('./core/gulp/tasks/create-page')
require('./core/gulp/tasks/create-component')
require('./core/gulp/tasks/create-model')
require('./core/gulp/tasks/copy-config')

setupWatchers(watchers)

const createFolder = (done) => {
  fs.mkdirSync(destinationFolder())
  done()
}

const generateSW = (done) => {
  fs.writeFileSync(`${destinationFolder()}/service-worker.js`, 'console.log("Development version. Will not cache files")', 'utf8')
  done()
}

const checkDevJson = (done) => {
  if (!fs.existsSync(`src/${buildConfigFile()}`)) {
    console.log('copying from dev.sample.json in src/config')
    fs.writeFileSync(`src/${buildConfigFile()}`, JSON.stringify(JSON.parse(fs.readFileSync('src/config/dev.sample.json', 'utf8')), null, 2), 'utf8')
  }
  done()
}

const autoCopyProd = (done) => {
  fs.writeFileSync(`src/config/prod.json`, JSON.stringify(JSON.parse(fs.readFileSync('src/config/dev.json', 'utf8'), null, 2)), 'utf8')
  done()
}

const runServer = (done) => {
  const args = ['serve']
  if (process.argv.indexOf('--port') > 0 && process.argv.indexOf('--port') + 1 < process.argv.length) {
    args.push('-p')
    args.push(process.argv.indexOf('--port') + 1)
  } else if (process.argv.indexOf('--host') > 0 && process.argv.indexOf('-h') + 1 < process.argv.length) {
    args.push('-o')
    args.push(process.argv.indexOf('--host') + 1)
  }
  const fb = spawn('firebase', args)

  fb.stdout.on('data', (data) => {
    console.log(data.toString('utf8'))
  })

  fb.stderr.on('data', (data) => {
    console.log(`stderr: ${data.toString('utf8')}`)
  })

  fb.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
    done()
  })
}

const series = gulp.series('clean-build', createFolder, gulp.parallel(compilerTasks))
const watch = gulp.series('clean-build', createFolder, generateSW, gulp.parallel(watchers.map((w) => (w.name))))

gulp.task('default', gulp.series(checkDevJson, 'compile-firebase-json', series, generateSW))
gulp.task('watch', gulp.series(checkDevJson, 'compile-firebase-json', watch, runServer))
gulp.task('build', gulp.series('compile-firebase-json', series, 'polymer-build', 'generate-sw'))
