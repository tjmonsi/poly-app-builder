const gulp = require('gulp')
const fs = require('fs')
const browserify = require('browserify')
const {destinationFolder, buildName} = require('../utils/utils')

gulp.task('browserify', (done) => {
  browserify({
    entries: ['core/gulp/utils/browser-essentials.js', 'core/scripts/index.js'],
    debug: buildName() === 'prod'
  }).bundle((err, buf) => {
    if (err) {
      console.error(err)
      return done()
    }
    fs.writeFileSync(`${destinationFolder()}/index.js`, buf.toString('utf8'), 'utf8')
    done()
  })
})
