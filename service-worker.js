const CACHE_VERSION = "v1";
const STATIC_CACHE = `career-passport-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `career-passport-runtime-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/app.js",
  "/manifest.json",
  "/offline.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-512-maskable.png",
  "/views/login.html",
  "/views/profile.html",
  "/views/jobs.html",
  "/src/styles/index.css",
  "/src/styles/theme.css",
  "/src/styles/tailwind.css",
  "/src/styles/fonts.css"
];

self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key !== STATIC_CACHE &&
                key !== RUNTIME_CACHE &&
                key.startsWith("career-passport-")
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  console.log("[ServiceWorker] Fetch", event.request.url);

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (
    ["style", "script", "image", "font"].includes(
      event.request.destination
    )
  ) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  event.respondWith(networkFirst(event.request));
});

function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    if (cached) {
      return cached;
    }

    return fetch(request).then((response) => {
      return cacheResponse(RUNTIME_CACHE, request, response);
    });
  });
}

function networkFirst(request) {
  return fetch(request)
    .then((response) => cacheResponse(RUNTIME_CACHE, request, response))
    .catch(() =>
      caches.match(request).then((cached) => {
        return cached || caches.match("/offline.html");
      })
    );
}

function cacheResponse(cacheName, request, response) {
  if (!response || response.status !== 200 || response.type !== "basic") {
    return response;
  }

  const responseClone = response.clone();
  caches.open(cacheName).then((cache) => cache.put(request, responseClone));
  return response;
}
