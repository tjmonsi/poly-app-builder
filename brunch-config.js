// See http://brunch.io for documentation.
const stylesheet = {joinTo: { 'app.css': 'src/styles/app.css' }}
const javascript = {
  joinTo: {
    'app.js': [
      /^src\/scripts/
    ],
    'vendor.js': [
      /^node_modules/
    ]
  }
}

const files = {
  javascript,
  stylesheet
}

const brunchStaticProcessor = (build) => {
  return require('html-brunch-static')({
    processors: [
      require('./plugins/json-brunch-static')(),
      require('./plugins/sass-brunch-static')()
    ],
    handlebars: {
      enableProcessor: true
    }
  })
}

const plugins = {
  copycat: {
    'bower_components': ['src/bower_components'],
    'project_components': ['src/project_components'],
    'page_components': ['src/page_components'],
    'test': ['src/test'],
    'images': ['src/images'],
    verbose: false,
    onlyChanged: true
  },
  static: {
    processors: [
      brunchStaticProcessor()
    ]
  }
}

const paths = {
  watched: ['src', 'src_pages']
}

const conventions = {
  ignored: [/\/_/, /^config/, /vendor\/(node|j?ruby-.+|bundle)\//, /^src\/bower_components/]
}

exports.files = files
exports.plugins = plugins
exports.conventions = conventions
exports.paths = paths
