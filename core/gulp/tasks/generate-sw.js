const gulp = require('gulp')
const fs = require('fs')
const wbBuild = require('workbox-build')
const { destinationFolder, buildName, buildConfig } = require('../utils/utils')

gulp.task('generate-sw', (done) => {
  var config = buildConfig()
  wbBuild.generateSW({
    cacheId: config.app.shortTitle,
    swDest: `${destinationFolder()}/build/sw.js`,
    globDirectory: destinationFolder() + '/build',
    navigateFallback: '/index.html',
    // clientsClaim: true,
    navigateFallbackWhitelist: [
      [/^(?!(\/__)|(\/service-worker\.js))/]
    ],
    globIgnores: [
      'service-worker.js', 
      'sw.js',
      'routing-sw.js',
      'workbox-sw.prod.v1.1.0.js', 
      'workbox-sw.prod.v1.1.0.js.map',
      'workbox-routing.v1.1.0.js' 
    ],
    skipWaiting: true,
    handleFetch: buildName() === 'dev',
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

  var str = 'importScripts(`sw.js`); importScripts("routing-sw.js");'

  fs.writeFileSync(`${destinationFolder()}/build/workbox-routing.v1.1.0.js`, fs.readFileSync('node_modules/workbox-routing/build/importScripts/workbox-routing.dev.v1.1.0.js', 'utf8'), 'utf8')
  fs.writeFileSync(`${destinationFolder()}/build/routing-sw.js`, fs.readFileSync('core/service-worker/routing.js', 'utf8'), 'utf8')
  fs.writeFileSync(`${destinationFolder()}/build/service-worker.js`, str, 'utf8')

  done()
})
