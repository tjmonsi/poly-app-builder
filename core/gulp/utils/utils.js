const fs = require('fs')

const sources = {
  modulesHtml: 'core/modules/**/*.html',
  bower: 'bower_components/**/*.*',
  index: 'core/root/index.html',
  appShell: 'core/shell/app-shell.html'
}

const buildName = () => {
  var build = process.argv.indexOf('build') > 0 ? 'prod' : 'dev'
  return process.argv.indexOf('--build') > 0 ? process.argv[process.argv.indexOf('--build') + 1] : build
}

const buildConfigFile = () => {
  return `config/${buildName()}.json`
}

const buildConfig = () => {
  return JSON.parse(fs.readFileSync(`core/${buildConfigFile()}`, 'utf8'))
}

const themeConfig = () => {
  const config = buildConfig()
  return JSON.parse(fs.readFileSync(`${config.theme}/theme.json`, 'utf8'))
}

const destinationFolder = () => {
  return `dist/${buildName() === 'dev' ? 'public' : buildName()}`
}

module.exports = {
  sources,
  buildName,
  buildConfig,
  buildConfigFile,
  destinationFolder,
  themeConfig
}
