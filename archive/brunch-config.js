// See http://brunch.io for documentation.
const fileProcessor = (build) => {
  const config = require(`./config/${build}.json`)
  return {
    stylesheets: {
      joinTo: {
        'app.css': `themes/${config.themeName}/styles/global.scss`
      }
    },
    javascripts: {
      joinTo: {
        'app.js': [
          /^core\/scripts/,
          new RegExp(`themes/${config.themeName}/scripts`)
        ],
        'vendor.js': [
          /^node_modules/
        ]
      }
    }
  }
}

const brunchStaticProcessor = (build) => {
  const config = require(`./config/${build}.json`)
  config.routing = Object.assign({}, {
    '/dashboard': {
      'href': 'pages/core-dashboard/core-dashboard.html'
    }
  }, config.routing)
  config.theme = require(`./themes/${config.themeName}/theme.json`)
  return require('html-brunch-static')({
    processors: [
      require('./brunch_core/plugins/json-brunch-static')(),
      require('./brunch_core/plugins/sass-brunch-static')()
    ],
    defaultContext: config,
    handlebars: {
      enableProcessor: true
    }
  })
}

const copyProcessor = (build) => {
  const config = require(`./config/${build}.json`)
  return {
    'bower_components': ['bower_components'],
    'shell': ['core/shell'],
    'components': ['core/components', `themes/${config.themeName}/components`],
    'pages': ['core/pages', `themes/${config.themeName}/pages`],
    'test': ['core/test', `themes/${config.themeName}/test`],
    'images': [`themes/${config.themeName}/images`],
    verbose: false,
    onlyChanged: true
  }
}

const plugins = {
  copyfilemon: copyProcessor('dev'),
  sass: {
    options: {
      includePaths: ['themes/base/styles']
    }
  },
  static: {
    processors: [
      brunchStaticProcessor('dev')
    ]
  }
}

const paths = {
  watched: ['themes', 'brunch_core/shell', 'core', 'modules']
}

const conventions = {
  ignored: [/\/_/, /^config/, /vendor\/(node|j?ruby-.+|bundle)\//, /^bower_components/]
}

exports.files = fileProcessor('dev')
exports.plugins = plugins
exports.conventions = conventions
exports.paths = paths
