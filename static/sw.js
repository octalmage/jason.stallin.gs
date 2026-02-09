// This service worker file is effectively a no-op that will reset any
// temporary client-side state that was previously cached via the
// now-removed gatsby-plugin-offline.
// See https://www.gatsbyjs.com/docs/how-to/performance/add-offline-support-with-a-service-worker/#removing-the-service-worker

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  self.registration.unregister()
    .then(function() {
      return self.clients.matchAll();
    })
    .then(function(clients) {
      clients.forEach(client => client.navigate(client.url));
    });
});
