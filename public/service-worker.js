self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute('/index.html');

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

// install new service worker when ok, then reload page.
// self.addEventListener("message", msg => {
//     if (msg.data.action == 'skipWaiting') {
//         self.skipWaiting()
//     }
// })

workbox.skipWaiting()
workbox.clientsClaim()

const LATEST_VERSION = Math.random().toString(36).substr(2, 9)

self.addEventListener('activate', (event) => {
    console.log(`%c ${LATEST_VERSION} `, 'background: #ddd; color: #0000ff')

    if (caches) {
        caches.keys().then((arr) => {
            arr.forEach((key) => {
                caches.open(key).then((cache) => {
                    cache.match('version').then((res) => {
                        if (!res) {
                            cache.put('version', new Response(LATEST_VERSION, { status: 200, statusText: LATEST_VERSION }))
                        } else if (res.statusText !== LATEST_VERSION) {
                            caches.delete(key).then(() => console.log(`%c Cleared Cache ${LATEST_VERSION}`, 'background: #333; color: #ff0000'))
                        } else console.log(`%c Great you have the latest version ${LATEST_VERSION}`, 'background: #333; color: #00ff00')
                    })
                })
            })
        })
    }
})


self.addEventListener('push', e => {
    const data = e.data.json()
    console.log('Push Received')

    self.registration.showNotification(data.title, {
        body: data.message,
        icon: '/img/icons/favicon-32x32.png'
    })

    self.addEventListener('notificationclick', function (event) {
        var found = false;
        event.waitUntil(
            clients.matchAll().then(function (clientsArr) {
                for (i = 0; i < clientsArr.length; i++) {
                    if (clientsArr[i].url === data.url) {
                        // We already have a window to use, focus it.
                        found = true;
                        clientsArr[i].focus();
                        break;
                    }
                }

                if (!found) {
                    // Create a new window.
                    clients.openWindow(data.url).then(function (windowClient) {
                        // do something with the windowClient.
                    });
                }
            })
        );
    });
})