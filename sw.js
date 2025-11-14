// 1. Save the files to the user's device
// The "install" event is called when the ServiceWorker starts up.
// All ServiceWorker code must be inside events.
self.addEventListener('install', function(e) {
    console.log('install');

    // waitUntil tells the browser that the install event is not finished until we have
    // cached all of our files
    e.waitUntil(
        caches.open('myonsenapppwa').then(cache => {
            // If the request for any of these resources fails, _none_ of the resources will be
            // added to the cache.
            return cache.addAll([
                '/ud-app/',
                '/ud-app/src',
                '/ud-app/manifest.json',
                'https://unpkg.com/onsenui/css/onsenui.min.css',
                'https://unpkg.com/onsenui/css/onsen-css-components.min.css',
                'https://unpkg.com/onsenui/js/onsenui.min.js'
            ]);
        })
    );
});

// 2. Intercept requests and return the cached version instead
self.addEventListener('fetch', function(e) {
    e.respondWith(
        // check if this file exists in the cache
        caches.match(e.request)
            // Return the cached file, or else try to get it from the server
            .then(response => response || fetch(e.request))
    );
});

// make PWA available when it's offline
caches.open('myonsenuipwa').then(cache => {
    return cache.addAll([
        '/ud-app/',
        '/ud-app/src',
        '/ud-app/manifest.json',
        'https://unpkg.com/onsenui/css/onsenui.min.css',
        'https://unpkg.com/onsenui/css/onsen-css-components.min.css',
        'https://unpkg.com/onsenui/js/onsenui.min.js'
    ]);
})