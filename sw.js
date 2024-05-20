// Files to cache
const cacheName = "lp-www-v0.1.0";
const cacheFiles = [
  "/",
  "./index.html",
  "/success.html",
  "/styles.css",
  "/logos",
  "/icons",
];

// Installing Service Worker
self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(cacheFiles);
    })()
  );
});

// Fetching content using Service Worker
self.addEventListener("fetch", (event) => {
  if (
    !event.request.url.startsWith("http:") &&
    !event.request.url.startsWith("https:")
  )
    return;

  event.respondWith(
    (async () => {
      const cacheResponse = await caches.match(event.request);
      if (cacheResponse) return cacheResponse;
      const networkResponse = await fetch(event.request);
      const cache = await caches.open(cacheName);
      cache.put(event.request, networkResponse.clone());
      return networkResponse;
    })()
  );
});
