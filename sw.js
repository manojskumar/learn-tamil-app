const CACHE_NAME = 'tamil-learning-adventure-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './index.css',
  './index.tsx', 
  // './manifest.json', // Only if it exists at the root relative to sw.js
  './metadata.json',
  // Key static assets from constants (alphabets and some words for demo)
  // These paths are relative to sw.js location
  './audio/alphabets/a.mp3',
  './audio/alphabets/aa.mp3',
  './audio/alphabets/i.mp3',
  './audio/alphabets/ik.mp3',
  './audio/words/ammaa.mp3',
  './audio/words/sivappu.mp3',
  './audio/words/naai.mp3',
  './audio/words/maampazham.mp3',
  // Add other critical assets like icons if they are local
  // CDN assets are typically not cached by your own SW unless specifically handled with opaque responses.
  // For full offline, it's better to host fonts and Tailwind (or its output CSS) locally.
  'https://cdn.tailwindcss.com', 
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&family=Poppins:wght@400;600;700&display=swap',
  'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2', 
  // Root imports for React from esm.sh
  'https://esm.sh/react@18.2.0',
  'https://esm.sh/react-dom@18.2.0',
  'https://esm.sh/react-dom@18.2.0/client',

];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and caching assets');
        // Add main assets (non-esm.sh local files)
        const localAssets = ASSETS_TO_CACHE.filter(url => url.startsWith('./') || url.startsWith('https://esm.sh/'));
        const coreAssetsPromise = cache.addAll(localAssets.map(url => new Request(url, { cache: 'reload' }))); // Force reload for local assets

        // For external CDN assets (not esm.sh as it's handled differently in fetch), try to cache them but don't let failure block SW install
        const cdnAssetsPromises = ASSETS_TO_CACHE.filter(url => url.startsWith('https://') && !url.startsWith('https://esm.sh/')).map(url => {
          return cache.add(new Request(url, { mode: 'no-cors' })).catch(err => {
            console.warn(`Failed to cache CDN asset ${url}:`, err);
          });
        });
        
        return Promise.all([coreAssetsPromise, ...cdnAssetsPromises]);
      })
      .catch(error => {
        console.error('Failed to open cache or cache assets during install:', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // For esm.sh, always go to network first, then cache for offline fallback
  if (event.request.url.startsWith('https://esm.sh/')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
            return caches.match(event.request).then(cachedResponse => {
                return cachedResponse || networkResponse; 
            });
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Cache-first strategy for other requests
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; 
        }
        return fetch(event.request).then(
          (networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) { 
              return networkResponse;
            }
            if (networkResponse.type === 'basic' || networkResponse.type === 'cors') {
                 const responseToCache = networkResponse.clone();
                 caches.open(CACHE_NAME)
                    .then((cache) => {
                    cache.put(event.request, responseToCache);
                    });
            }
            return networkResponse;
          }
        ).catch(error => {
          console.error('Fetch failed; returning offline fallback or error for:', event.request.url, error);
          // Optionally, return a generic offline page or asset here
        });
      })
  );
});