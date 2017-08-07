const gulp = require('gulp')
const fs = require('fs')
const {buildConfig, buildName, destinationFolder} = require('../utils/utils')

gulp.task('compile-firebase-json', (done) => {
  const config = buildConfig()

  const firebase = {
    database: {
      rules: 'database.rules.json'
    },
    hosting: config.hosting
  }

  for (var j in firebase.hosting.rewrites) {
    if (firebase.hosting.rewrites[j].source === '**') {
      firebase.hosting.rewrites.splice(j, 1)
    }
  }

  for (var i in config.routing) {
    firebase.hosting.rewrites.push({
      source: i.split('/').map(path => (path.indexOf(':') === 0 ? '**' : path)).join('/'),
      destination: '/index.html'
    })
  }

  firebase.hosting.public = buildName() === 'prod' ? 'dist/prod_temp/build' : destinationFolder()

  fs.writeFileSync('firebase.json', JSON.stringify(firebase, null, 2), 'utf8')
  done()
})
