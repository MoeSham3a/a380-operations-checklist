// Version number - increment this when you update the app
const APP_VERSION = '1.0.4';
const CACHE_NAME = `a380-operations-v${APP_VERSION}`;

// Comprehensive list of assets to cache
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    // Mind map files
    './mindmap.html',
    './mindmap.css',
    './mindmap.js',
    // Image assets
    './Brake-cooling-table.JPG',
    './ERG.JPG',
    './Departure-briefing.JPG',
    './Fuel-difference-table.JPG',
    './Pre-departure-PA.JPG',
    './USA-PA.JPG',
    './Workflow-Mind-Map.png',
    // Google Fonts
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
];

// Install event - cache all resources
self.addEventListener('install', event => {
    console.log('[ServiceWorker] Installing version', APP_VERSION);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[ServiceWorker] Caching assets');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('[ServiceWorker] Cache install failed:', error);
            })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activating version', APP_VERSION);
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[ServiceWorker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    // Take control of all pages immediately
    self.clients.claim();
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Skip chrome-extension and other non-http(s) requests
    if (!event.request.url.startsWith('http')) {
        return;
    }

    // For version checks (manifest.json), use Network-First strategy
    if (url.pathname.endsWith('manifest.json') && event.request.headers.get('x-version-check')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Clone and cache the response
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                })
                .catch(() => {
                    // If network fails, try cache
                    return caches.match(event.request);
                })
        );
        return;
    }

    // For all other requests, use Cache-First strategy
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached response if found
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then(response => {
                        // Check if valid response
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        // For requests from our domain or fonts, cache them
                        const shouldCache =
                            url.origin === location.origin ||
                            url.hostname === 'fonts.googleapis.com' ||
                            url.hostname === 'fonts.gstatic.com';

                        if (shouldCache && response.type !== 'opaque') {
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        }

                        return response;
                    })
                    .catch(error => {
                        console.error('[ServiceWorker] Fetch failed for:', event.request.url, error);
                        // Could return a custom offline page here
                        return new Response('Offline - Please check your internet connection', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Message handlers for version updates and cache management
self.addEventListener('message', (event) => {
    if (event.data === 'GET_VERSION') {
        // Send current version to client
        event.ports[0].postMessage({ version: APP_VERSION });
    }

    if (event.data === 'SKIP_WAITING') {
        // Force update
        self.skipWaiting();
    }

    if (event.data === 'CACHE_REFRESH') {
        // Refresh cache with new assets
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.addAll(urlsToCache);
                })
                .then(() => {
                    event.ports[0].postMessage({ success: true });
                })
                .catch(error => {
                    console.error('[ServiceWorker] Cache refresh failed:', error);
                    event.ports[0].postMessage({ success: false, error: error.message });
                })
        );
    }
});

// Background sync for updating cache when online
self.addEventListener('sync', event => {
    if (event.tag === 'update-cache') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.addAll(urlsToCache);
                })
        );
    }
});