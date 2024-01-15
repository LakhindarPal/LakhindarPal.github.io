// cache for offline use
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("lp-cache-v2.0.0").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/success.html",
        "/styles.css",
        "/main.js",
        "/logos",
        "/icons",
        "/pics"
      ]);
    })
  );
});

// Network falling back to cache approach
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});