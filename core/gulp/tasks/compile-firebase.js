const gulp = require('gulp')
const fs = require('fs')
const { template } = require('lodash')
const {buildConfig, destinationFolder} = require('../utils/utils')

gulp.task('compile-firebase', (done) => {
  if (!fs.existsSync(`${destinationFolder()}/opts`)) {
    fs.mkdirSync(`${destinationFolder()}/opts`)
  }
  const firebase = fs.readFileSync('core/gulp/templates/_firebase.html', 'utf8')
  const config = buildConfig()
  fs.writeFileSync(`${destinationFolder()}/opts/firebase.html`, template(firebase)(config), 'utf8')
  done()
})
