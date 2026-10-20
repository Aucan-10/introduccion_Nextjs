const CACHE_NAME = 'biblioteca-v2'; // Versión nueva para forzar actualización
const CACHE_API_NAME = 'biblioteca-api-v1';
const ARCHIVOS_A_GUARDAR = [
  '/',
  '/libros', // Agregamos esta ruta para asegurar que el shell de la página se guarde
  '/manifest.json',
];

const API_HOST = 'localhost:8000'; // El host de tu backend Laravel

// 1. INSTALACIÓN
self.addEventListener('install', (event) => {
  console.log('Service Worker: instalando (v2)...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS_A_GUARDAR))
  );
  self.skipWaiting(); // Fuerza a que este nuevo SW se active de inmediato
});

// 2. ACTIVACIÓN (Limpia cachés viejas)
self.addEventListener('activate', (event) => {
  console.log('Service Worker: activado y tomando control');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== CACHE_API_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // Toma control inmediato de las pestañas abiertas
});

// 3. INTERCEPTAR PETICIONES (FETCH)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // CASO A: Si la petición es a tu API de Laravel (y es GET)
  if (url.host.includes(API_HOST) && event.request.method === 'GET') {
    event.respondWith(
      fetch(event.request)
        .then((respuestaRed) => {
          // Si hay internet: guardamos una copia en la caché para el futuro
          const copiaRespuesta = respuestaRed.clone();
          caches.open(CACHE_API_NAME).then((cache) => {
            cache.put(event.request, copiaRespuesta);
          });
          return respuestaRed;
        })
        .catch(() => {
          // Si NO hay internet (Offline): devolvemos lo que tengamos guardado en caché
          return caches.match(event.request);
        })
    );
    return;
  }

  // CASO B: Para todo lo demás (HTML, CSS, JS, íconos) -> Cache-first
  event.respondWith(
    caches.match(event.request).then((respuestaCache) => {
      return respuestaCache || fetch(event.request);
    })
  );
});
