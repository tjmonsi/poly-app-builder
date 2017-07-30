router.registerRoute({route: new workbox.routing.ExpressRoute({
  path: 'https://' + app.firebaseId + '.firebaseio.com/:json+',
  handler: function (obj) {
    var event = obj.event
    var params = obj.params
    var url = obj.url

    return fetch(url.href)
      .then(function (response) {
        caches.open(app.shortTitle).then(function (cache) {
          cache.put(event.request, response)
        })
        return response.clone()
      })
      .catch(function (err) {
        console.log(err, url.href, caches.match(url.href))
        return caches.match(url.href)
      })
  }
})})
