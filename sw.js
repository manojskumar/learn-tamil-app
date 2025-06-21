const CACHE_NAME = 'tamil-learning-adventure-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx', // This will be the bundled JS file in a real build
  '/manifest.json', // Assuming you might add a manifest later
  '/metadata.json',
  // Key static assets from constants (alphabets and some words for demo)
  // These paths are placeholders and would need to exist.
  '/audio/alphabets/a.mp3',
  '/audio/alphabets/aa.mp3',
  '/audio/alphabets/i.mp3',
  '/audio/alphabets/ik.mp3',
  '/audio/words/ammaa.mp3',
  '/audio/words/sivappu.mp3',
  '/audio/words/naai.mp3',
  '/audio/words/maampazham.mp3',
  // Add other critical assets like icons if they are local
  // '/components/icons/SpeakerIcon.tsx', // SW caches built output, not source
  // CDN assets are typically not cached by your own SW unless specifically handled with opaque responses, which can be tricky.
  // For full offline, it's better to host fonts and Tailwind (or its output CSS) locally.
  'https://cdn.tailwindcss.com', // Will be an opaque request
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&family=Poppins:wght@400;600;700&display=swap', // Opaque
  'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2', // Example of a font file that might be fetched
  // Root imports for React from esm.sh
  'https://esm.sh/react@18.2.0',
  'https://esm.sh/react-dom@18.2.0',
  'https://esm.sh/react-dom@18.2.0/client', // if specific client entry is used

];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and caching assets');
        // Add main assets
        const coreAssetsPromise = cache.addAll(ASSETS_TO_CACHE.filter(url => !url.startsWith('https://esm.sh'))); // Don't aggressively cache esm.sh main modules

        // For CDN assets, try to cache them but don't let failure block SW install
        const cdnAssetsPromises = ASSETS_TO_CACHE.filter(url => url.startsWith('https://') && !url.includes('esm.sh')).map(url => {
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
  // This is because esm.sh handles its own complex versioning and dependencies.
  if (event.request.url.startsWith('https://esm.sh/')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
            // If network fails or gives an error, try cache for esm.sh resources
            return caches.match(event.request).then(cachedResponse => {
                return cachedResponse || networkResponse; // Return cached or original error response
            });
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // Network failed, try to serve from cache
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
          return response; // Serve from cache
        }
        // Not in cache, fetch from network
        return fetch(event.request).then(
          (networkResponse) => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200) { // Don't cache errors or opaque responses directly unless intended
              return networkResponse;
            }

            // Opaque responses (e.g. no-cors for CDN) cannot be cloned if their type is 'opaque'.
            // Only cache if it's not an opaque response or if we explicitly want to cache it.
            // For simplicity here, we'll cache 'basic' and 'cors' type responses.
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
          // Optionally, return a generic offline page or error response
          // For an API, you might return a specific JSON error structure
        });
      })
  );
});