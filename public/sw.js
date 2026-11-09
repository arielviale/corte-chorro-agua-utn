/**
 * Service Worker para AWJ 4.0 - Presentación Offline
 * Precarga assets críticos para defensa sin conexión
 */

const CACHE_NAME = 'awj-4.0-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Assets críticos que deben estar disponibles offline
const CRITICAL_ASSETS = [
  // Imágenes referenciadas en la presentación
  '/images/awj_metal_cutting.jpg',
  '/images/pwj_pure_waterjet.jpg',
  '/images/awj_5axis_tilt.jpg',
  '/images/waterjet_zac_metallurgy.jpg',
  '/images/corte_agua_vs_abrasivo.jpg',
  '/images/kerf_taper_real.jpg',
  '/images/jet_lag_striations_real.jpg',
  '/images/corte%20de%20agua.jpg',
  // Fuentes y scripts se cachean automáticamente por Vite
];

// Install: precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
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

// Fetch: stale-while-revalidate para assets críticos, network-first para HTML
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar same-origin
  if (url.origin !== location.origin) {
    return;
  }

  // HTML: network-first (siempre intentar red para updates)
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  // Assets críticos (imágenes): stale-while-revalidate
  const isCriticalAsset = CRITICAL_ASSETS.some((asset) => url.pathname.endsWith(asset.split('/').pop() || ''));
  if (isCriticalAsset || request.destination === 'image') {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Otros recursos (JS, CSS, fonts): cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});

// Mensaje para skipWaiting manual
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] AWJ 4.0 Service Worker loaded');