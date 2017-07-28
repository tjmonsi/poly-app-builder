const through = require('through2')
const parse5 = require('parse5')
const parse5Utils = require('parse5-utils')
const { themeConfig, buildConfig } = require('../utils/utils')

const prefixStream = (prefixText) => {
  var stream = through()
  stream.write(prefixText)
  return stream
}

const injectSharedStyle = () => {
  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      return cb(null, file)
    }
    if (!file.isDirectory()) {
      var string = file.contents.toString('utf8')
      var document = parse5.parseFragment(string)
      var fileArray = file.path.replace(process.cwd() + '/core/modules', '').split('/')
      var fileName = fileArray.pop()
      var newFileArray = fileArray.map((directory) => {
        return !directory ? '.' : '..'
      })
      for (var i in document.childNodes) {
        var child = document.childNodes[i]
        if (child.nodeName === 'dom-module') {
          var id
          for (var m in child.attrs) {
            if (child.attrs[m].name === 'id') {
              id = child.attrs[m].value
              break
            }
          }
          for (var j in child.childNodes) {
            var domChild = child.childNodes[j]
            if (domChild.nodeName === 'template') {
              var content = domChild.content
              for (var k in content.childNodes) {
                var style = content.childNodes[k]
                if (style.nodeName === 'style') {
                  var include, styleModules
                  var config = buildConfig()
                  var theme = themeConfig()
                  var link = parse5Utils.createNode('link')
                  link.attrs = parse5Utils.toAttrs({
                    rel: 'import',
                    href: newFileArray.join('/') + '/' + config.theme.src.replace('core/modules/', '') + '/' + theme.name + '-theme.html'
                  })

                  if (style.attrs.length > 0) {
                    for (var l in style.attrs) {
                      include = style.attrs[l]
                      if (include.name === 'include') {
                        break
                      }
                    }
                  }
                  if (!include) {
                    include = {
                      name: 'include',
                      value: ''
                    }
                    if (id && !config.theme.ignoreComponents.indexOf(id) >= 0 && id !== `${theme.name}-theme`) {
                      include.value = `${theme.name}-theme`
                      style.attrs.push(include)
                      document.childNodes.splice(i - 1, 0, link)
                    }
                  } else {
                    styleModules = include.value.split(/( )+/g)
                    if (id && !config.theme.ignoreComponents.indexOf(id) >= 0 && id !== `${theme.name}-theme`) {
                      styleModules.push(`${theme.name}-theme`)
                      include.value = styleModules.join(' ').trim()
                      document.childNodes.splice(i - 1, 0, link)
                    }
                  }
                  break
                }
              }
              break
            }
          }
          break
        }
      }
      string = parse5.serialize(document)

      if (file.isBuffer()) {
        file.contents = Buffer.concat([Buffer.from(string)])
      }

      if (file.isStream()) {
        file.contents = prefixStream(Buffer.from(string))
      }
    }
    cb(null, file)
  })
}

module.exports = injectSharedStyle
