const fs = require('fs')

const sources = {
  modulesHtml: ['core/modules/**/*.html', 'src/modules/**/*.html'],
  bower: 'bower_components/**/*.*',
  index: 'core/root/*.hbs',
  appShell: 'core/shell/app-shell.html',
  opts: ['core/opts/*.html', 'src/opts/*.html'],
  sass: ['core/modules/**/*.scss', 'src/modules/**/*.scss'],
  images: ['src/images/**/*.*', 'src/images/*.*'],
  browserify: ['core/tasks/utils/browser-essentials', 'src/scripts/*.js', 'src/scripts/**/*.js'],
  modules: {
    'app-router': true,
    'app-network-status': true,
    'firebase-mixin': true
  }
}

const getVersion = () => {
  return JSON.parse(fs.readFileSync('package.json'), 'utf8').version
}

const buildName = () => {
  var build = process.argv.indexOf('build') > 0 ? 'prod' : 'dev'
  return process.argv.indexOf('--build') > 0 ? process.argv[process.argv.indexOf('--build') + 1] : build
}

const buildConfigFile = () => {
  return `config/${buildName()}.json`
}

const buildConfig = () => {
  return JSON.parse(fs.readFileSync(`src/${buildConfigFile()}`, 'utf8'))
}

const themeConfig = () => {
  const config = buildConfig()
  return JSON.parse(fs.readFileSync(`${config.theme.src}/theme.json`, 'utf8'))
}

const destinationFolder = () => {
  var dest = buildName() === 'dev' ? 'public' : buildName()
  dest = dest === 'prod' ? 'prod_temp' : dest
  return `dist/${dest}`
}

module.exports = {
  sources,
  buildName,
  buildConfig,
  buildConfigFile,
  destinationFolder,
  themeConfig,
  getVersion
}
