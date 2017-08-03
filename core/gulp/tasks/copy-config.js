const gulp = require('gulp')
const fs = require('fs')

gulp.task('copy-config', (done) => {
  var source = process.argv.indexOf('--source')
  var dest = process.argv.indexOf('--dest')
  if (source >= 0 && process.argv.length < source + 1 && dest >= 0 && process.argv.length < dest + 1) {
    console.log('needs two parameters: gulp copy-config --source source --dest destination')
    return done()
  }
  fs.writeFileSync(`src/config/${process.argv[dest + 1].replace('.json', '')}.json`, fs.readFileSync(`src/config/${process.argv[source + 1].replace('.json', '')}.json`, 'utf8'))
  console.log('done')
  done()
})
