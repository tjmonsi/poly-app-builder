importScripts('workbox-sw.prod.v1.1.0.js')

console.log('Developer service worker. It will not cache the files as of the moment')

new self.WorkboxSW({
  skipWaiting: true
})
