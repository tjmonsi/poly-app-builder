const gulp = require('gulp')
const fs = require('fs')
const wbBuild = require('workbox-build')
const { destinationFolder, buildName } = require('../utils/utils')

gulp.task('generate-sw', (done) => {
  wbBuild.generateSW({
    swDest: `${destinationFolder()}/sw.js`,
    globDirectory: destinationFolder(),
    globIgnores: ['service-worker.js', 'sw.js', 'workbox-sw.prod.v1.1.0.js', 'workbox-sw.prod.v1.1.0.js.map'],
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/maps.googleapis.com\/.*/,
        handler: 'networkFirst'
      },
      {
        urlPattern: /^https:\/\/www.gstatic.com\/firebasejs\/.*/,
        handler: 'networkFirst'
      },
      {
        urlPattern: /^https:\/\/www.google-analytics.com\/analytics.js/,
        handler: 'networkFirst'
      }
    ]
  }).then(() => {
    console.log('Automated Service worker generated.')
  })

  var str = buildName() === 'dev' ? fs.readFileSync('core/service-worker/dev-service-worker.js', 'utf8') : 'importScripts(`sw.js`);'

  fs.writeFileSync(`${destinationFolder()}/service-worker.js`, str, 'utf8')

  done()
})
