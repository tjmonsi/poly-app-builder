// See http://brunch.io for documentation.
const fileProcessor = (build) => {
  const config = require(`./config/${build}.json`)
  return {
    stylesheets: {
      joinTo: {
        'app.css': `src/themes/${config.themeName}/styles/global.scss`
      }
    },
    javascripts: {
      joinTo: {
        'app.js': [
          /^core\/scripts/,
          /^src\/scripts/
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
  config.theme = require(`./src/themes/${config.themeName}/theme.json`)
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
    'bower_components': ['src/bower_components'],
    'shell': ['core/shell'],
    'components': ['core/components', `src/themes/${config.themeName}/components`],
    'pages': ['core/pages', `src/themes/${config.themeName}/pages`],
    'test': ['core/test', `src/themes/${config.themeName}/test`],
    'images': [`src/themes/${config.themeName}/images`],
    verbose: false,
    onlyChanged: true
  }
}

const plugins = {
  copyfilemon: copyProcessor('dev'),
  sass: {
    options: {
      includePaths: ['src/themes/base/styles']
    }
  },
  static: {
    processors: [
      brunchStaticProcessor('dev')
    ]
  }
}

const paths = {
  watched: ['src', 'brunch_core/shell', 'core']
}

const conventions = {
  ignored: [/\/_/, /^config/, /vendor\/(node|j?ruby-.+|bundle)\//, /^src\/bower_components/]
}

exports.files = fileProcessor('dev')
exports.plugins = plugins
exports.conventions = conventions
exports.paths = paths
