importScripts('workbox-routing.v1.1.0.js')
// importScripts('https://www.gstatic.com/firebasejs/4.1.4/firebase-app.js')
// importScripts('https://www.gstatic.com/firebasejs/4.1.4/firebase-database.js')

const route = new workbox.routing.ExpressRoute({
  path: 'https://tjkpm-site-yng.firebaseio.com/:json+',
  handler: ({event, params, url}) => {
    // console.log(caches, event, params, url, event.request)
    return fetch(url.href).then((response) => {
      caches.open('Polyblog').then((cache) => {
        cache.put(event.request, response)
      })
      return response.clone()
    }).catch((err) => {
      console.log(url.href, caches.match(url.href))
      return caches.match(url.href)
    })
  }
})

const router = new workbox.routing.Router()
router.registerRoute({route})
