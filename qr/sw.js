const cacheName = 'qr-cache-v1';
const cacheUrls = [
    './index.html',
    './qr_apple-touch-icon.png',
    './css/index.css',
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.1/js.cookie.min.js',
    './js/index.js'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(cacheUrls);
            })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches
            .match(e.request)
            .then(response => {
                return response ? response : fetch(e.request);
            })
    );
});