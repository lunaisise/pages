const cacheName = 'qr-cache-v1';
const cacheUrls = [
    '',
    './qr_apple-touch-icon.png',
    './css/index.css',
    './js/index.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(cacheUrls);
            })
    );
});