const CACHE_NAME = 'v1';
const CURRENT_CACHES = [
    './favicon.ico',
    './favicon16.png',
    './favicon32.png',
    './favicon48.png',
    './favicon57.png',
    './favicon60.png',
    './favicon64.png',
    './favicon72.png',
    './favicon76.png',
    './favicon96.png',
    './favicon114.png',
    './favicon120.png',
    './favicon144.png',
    './favicon152.png',
    './favicon180.png',
    './favicon192.png',
    './index.html',
    './index.css',
    './index.js',
    './meta.json'
];

caches.open(CACHE_NAME)
    .then(cache => {
        return cache.addAll(CURRENT_CACHES);
    });

self.addEventListener('fetch', event => {
    console.log(event.request.url);
    event.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.match(event.request)
                    .then(response => {
                        return response || fetch(event.request)
                            .then(response => {
                                cache.put(event.request, response.clone());
                                return response;
                            });
                    });
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                const promises = [];
                keys.forEach(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        promises.push(caches.delete(cacheName));
                    }
                });
                return Promise.all(promises);
            })
    );
});