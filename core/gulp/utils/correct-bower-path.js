const fs = require('fs')
const through = require('through2')
const parse5 = require('parse5')

const prefixStream = (prefixText) => {
  var stream = through()
  stream.write(prefixText)
  return stream
}

const correctBowerPath = () => {
  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      return cb(null, file)
    }
    if (!file.isDirectory()) {
      var string = fs.readFileSync(file.path, enc)
      var document = parse5.parseFragment(string)
      for (var i in document.childNodes) {
        var child = document.childNodes[i]
        if (child.tagName === 'link') {
          for (var j in child.attrs) {
            if (child.attrs[j].name === 'href') {
              document.childNodes[i].attrs[j].value = child.attrs[j].value.replace(new RegExp('../bower_components/', 'g'), 'bower_components/')
            }
          }
        } else if (child.tagName === 'script') {
          for (var k in child.attrs) {
            if (child.attrs[k].name === 'src') {
              document.childNodes[i].attrs[k].value = child.attrs[k].value.replace(new RegExp('../bower_components/', 'g'), 'bower_components/')
            }
          }
        }
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

module.exports = correctBowerPath
