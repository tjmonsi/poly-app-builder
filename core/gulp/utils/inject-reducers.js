const fs = require('fs')
const through = require('through2')
const parse5 = require('parse5')
const parse5Utils = require('parse5-utils')
const { buildConfig } = require('./utils.js')

const prefixStream = (prefixText) => {
  var stream = through()
  stream.write(prefixText)
  return stream
}

const injectReducers = () => {
  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      return cb(null, file)
    }
    if (!file.isDirectory()) {
      var string = fs.readFileSync(file.path, enc)
      var document = parse5.parseFragment(string)
      var config = buildConfig()

      for (var i in config.reducers) {
        var link = parse5Utils.createNode('link')
        link.attrs = parse5Utils.toAttrs({
          rel: 'import',
          // href: newFileArray.join('/') + '/' + config.theme.src.replace('core/modules/', '') + '/' + theme.name + '-theme.html'
          href: '../' + config.reducers[i]
        })
        parse5Utils.prepend(document, link)
      }
      var newString = parse5.serialize(document)

      if (file.isBuffer()) {
        file.contents = Buffer.concat([Buffer.from(newString)])
      }

      if (file.isStream()) {
        file.contents = prefixStream(Buffer.from(newString))
      }
    }
    cb(null, file)
  })
}

module.exports = injectReducers
