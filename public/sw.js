const CACHE_NAME = 'lorvelle-v1'
const urlsToCache = [
  '/',
  '/manifest.json',
  '/lorvelle-logo.png',
  '/lorvelle-logo-192.png',
  '/lorvelle-logo-512.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
  self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request).then(response => {
          // Cache responses for static assets
          if (event.request.url.includes('/static/') ||
              event.request.url.includes('/assets/') ||
              event.request.url.endsWith('.png') ||
              event.request.url.endsWith('.jpg') ||
              event.request.url.endsWith('.svg')) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache))
          }
          return response
        })
      })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})
