let cacheName = 'coronavirus-live';
let filesToCache = [
    '/assets/images/offline.png',
    '/offline.html',
    '/manifest.json',
    '/favicon.ico',
    '/assets/images/icon-144.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then( (cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch',event => {
    if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(event.request.url).catch(error => {
                return caches.match('/offline.html');
            }).then(async (response) => {
                if (!response.redirected) {
                    return response;
                }
                return new Response(await response.blob(), {
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText,
                });
            })
        );
    } else {
        event.respondWith(caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});
