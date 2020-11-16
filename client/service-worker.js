const FILES_TO_CACHE = [
    '/css/style.css',
    '/favorites.html',
    '/index.html',
    'topic.html',
    '/dist/app.bundle.js',
    '/dist/favorites.bundle.js',
    '/dist/topic.bundle.js',
    'https://fonts.googleapis.com/css?family=Istok+Web|Montserrat:800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
];

const STATIC_CACHE = 'newsy-static-v1';
const RUNTIME_CACHE = 'runtime-cache';

self.addEventListener('install', function (event) {
    event.waitUntil(
    caches.open(STATIC_CACHE)
    .then(cache => {
        return cache.addAll(FILES_TO_CACHE);
    })
    .then(() => self.skipWaiting()),
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
event.waitUntil(
    caches.keys()
    .then(cacheNames => {
    return Promise.all(
        cacheNames
        .filter(cacheName => {
            return cacheNames.filter(
                cacheName => !currentCaches.includes(cacheName)
            );
        })
        )
    })
    .then(cachesToDelete => {
        return Promise.all(
            cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
            })
        );
        })
        .then(() => self.clients.claim())
    )
});

//save for later
// document.querySelector('.cache-article').addEventListener('click', event => {
//     event.preventDefault();
//     let id = this.dataset.articleId;
//     caches.open('mysite-article-' + id).then(function (cache) {
//       fetch('/get-article-urls?id=' + id)
//         .then(function (response) {
//           // /get-article-urls returns a JSON-encoded array of
//           // resource URLs that a given article depends on
//           return response.json();
//         })
//         .then(function (urls) {
//           cache.addAll(urls);
//         });
//     });
//   });

self.addEventListener('fetch', event => {
// non GET requests are not cached and requests to other origins are not cached
if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
) {
    event.respondWith(fetch(event.request));
    return;
}

  // use cache first for all other requests for performance
event.respondWith(
caches.match(event.request).then(cachedResponse => {
    if (cachedResponse) {
    return cachedResponse;
    }

      // request is not in cache. make network request and cache the response
    return caches.open(RUNTIME_CACHE).then(cache => {
    return fetch(event.request).then(response => {
        return cache.put(event.request, response.clone()).then(() => {
        return response;
        });
    });
    });
})
);
});
