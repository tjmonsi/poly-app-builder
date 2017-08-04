const gulp = require('gulp')
const sass = require('node-sass')
const fs = require('fs')
const { template } = require('lodash')
const {buildConfig, themeConfig, destinationFolder} = require('../utils/utils')

gulp.task('compile-sass', (done) => {
  var config = buildConfig()
  var theme = themeConfig()
  sass.render({
    file: config.theme.src + '/theme.scss'
  }, (err, result) => {
    if (err) {
      console.error(err)
      return done()
    }

    const themeTemplate = fs.readFileSync('core/gulp/templates/_theme.html', 'utf8')

    if (!fs.existsSync(`${destinationFolder()}/modules`)) {
      fs.mkdirSync(`${destinationFolder()}/modules`)
    }

    if (!fs.existsSync(`${destinationFolder()}/${config.theme.src.replace('src/', '')}`)) {
      fs.mkdirSync(`${destinationFolder()}/${config.theme.src.replace('src/', '')}`)
    }

    fs.writeFileSync(`${destinationFolder()}/${config.theme.src.replace('src/', '')}/${theme.name}-theme.html`, template(themeTemplate)({ themeName: theme.name, style: result.css.toString('utf8'), dependencies: theme.dependencies }), 'utf8')
    // console.log(result.css.toString('utf8'))
    done()
  })
})
