console.log('https://' + app.firebaseId + '.firebaseio.com/:json+')
const route = new workbox.routing.ExpressRoute({
  path: 'https://' + app.firebaseId + '.firebaseio.com/:json+',
  handler: ({event, params, url}) => {
    // console.log(caches, event, params, url, event.request)
    return fetch(url.href).then(function (response) {
      caches.open(app.shortTitle).then(function (cache) {
        cache.put(event.request, response)
      })
      return response.clone()
    }).catch(function (err) {
      console.log(url.href, caches.match(url.href))
      return caches.match(url.href)
    })
  }
})

router.registerRoute({route: route})
