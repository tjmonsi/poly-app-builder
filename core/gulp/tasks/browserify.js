const gulp = require('gulp')
const fs = require('fs')
const browserify = require('browserify')
const {destinationFolder, buildName} = require('../utils/utils')

gulp.task('browserify', (done) => {
  browserify({
    entries: ['core/gulp/utils/browser-essentials.js', 'core/scripts/index.js'],
    debug: buildName() === 'prod'
    // transform: ['loose-envify', { NODE_ENV: 'production' }]
  })
  .transform('loose-envify', {
    _: 'purge',
    NODE_ENV: 'production'
  })
  .bundle((err, buf) => {
    if (err) {
      console.error('something', err)
      return done()
    }
    fs.writeFileSync(`${destinationFolder()}/index.js`, buf.toString('utf8'), 'utf8')
    done()
  })
})
