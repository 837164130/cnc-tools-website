// Service Worker for Offline Support
const CACHE_NAME = 'cccnc-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/search.html',
  '/compare.html',
  '/calculator.html',
  '/css/enhanced.css',
  '/css/print.css',
  '/js/main.js',
  '/js/mobile-nav.js',
  '/js/search.js',
  '/js/filter.js',
  '/js/product-enhancements.js',
  '/js/image-loader.js',
  '/js/scroll-animations.js',
  '/js/breadcrumb.js',
  '/js/back-to-top.js',
  '/js/page-loader.js',
  '/js/share.js',
  '/js/language-switcher.js',
  '/js/notifications.js',
  '/js/performance.js',
  '/js/analytics.js',
  '/js/favorites.js',
  '/js/theme-switcher.js',
  '/js/keyboard-shortcuts.js',
  '/js/recommendations.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(() => {
        // Continue without caching
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((networkResponse) => {
            // Cache successful GET requests
            if (event.request.method === 'GET' && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Return offline page for HTML requests
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match('/');
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});
