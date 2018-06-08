var cacheName = 'countdown';

var filesToCache = [
    '/',
    '/index.html',
    '/timer.png',
    '/src/App.css',
    '/src/App.jsx',
    '/src/Clock.jsx',
    '/src/index.css',
    '/src/index.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    '/static/js/bundle.js'
];

self.addEventListener('install',function(event){
    console.log('[serviceWorker] installing');
    event.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log('[ServiceWorker] caching');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate',function(event){
    console.log('[ServiceWorker] activating');
    event.waitUntil(
        caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function(key){
                if(key !== cacheName){
                    console.log('[ServiceWorker] removing old cache');
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch',function(event){
    console.log('[Service Worker] fetching..');
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        })
    );
});