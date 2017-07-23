const sources = {
  modulesHtml: 'core/modules/**/*.html',
  bower: 'bower_components/**/*.*'
}

const buildName = () => {
  var build = process.argv.indexOf('build') > 0 ? 'prod' : 'dev'
  return process.argv.indexOf('--build') > 0 ? process.argv[process.argv.indexOf('--build') + 1] : build
}

const buildConfig = () => {
  return require(`../../config/${buildName()}.json`)
}

const destinationFolder = () => {
  return `dist/${buildName() === 'dev' ? 'public' : buildName()}`
}

module.exports = {
  sources,
  buildName,
  buildConfig,
  destinationFolder
}
