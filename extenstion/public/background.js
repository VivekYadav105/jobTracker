// background.js
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('JobBoard').then((cache) => {
        return cache.addAll([
          'index.html',
          'logo.png',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  