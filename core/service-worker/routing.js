importScripts('workbox-routing.v1.1.0.js')
// importScripts('https://www.gstatic.com/firebasejs/4.1.4/firebase-app.js')
// importScripts('https://www.gstatic.com/firebasejs/4.1.4/firebase-database.js')

console.log('start routing')

const route = new workbox.routing.ExpressRoute({
  path: 'https://tjkpm-site-yng.firebaseio.com/test.json?orderBy=%22val%22',
  handler: ({event, params, url}) => {
    // console.log(caches, event, params, url, event.request)
    return fetch(url.href).then((response) => {
      console.log(response)
      return response
    }).catch((err) => {
      console.log(err)
      return new Response(JSON.stringify({t2: {val: 1}, t3: {val: 2}}), {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
    // return event.preloadResponse
    // return Promise.resolve({t2: {val: 1}, t3: {val: 2}})
  }
})

const router = new workbox.routing.Router()
router.registerRoute({route})

console.log(router, caches)