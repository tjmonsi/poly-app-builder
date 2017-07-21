const fs = require('fs')
const through = require('through2')
const parse5 = require('parse5')

module.exports = through.obj((chunk, enc, cb) => {
  if (!chunk.isDirectory()) {
    var string = fs.readFileSync(chunk.path, enc)
    var document = parse5.parseFragment(string)
    for (var i in document.childNodes) {
      var child = document.childNodes[i]
      if (child.tagName === 'link') {
        for (var j in child.attrs) {
          if (child.attrs[j].name === 'href') {
            child.attrs[j].value = child.attrs[j].value.replace(new RegExp('../dist/public/', 'g'), '')
          }
        }
      } else if (child.tagName === 'script') {
        for (var k in child.attrs) {
          if (child.attrs[k].name === 'src') {
            child.attrs[k].value = child.attrs[k].value.replace(new RegExp('../dist/public/', 'g'), '')
          }
        }
      }
    }
    string = parse5.serialize(document)
    chunk.contents = Buffer.from(string)
  }
  cb(null, chunk)
})
