const cacheName = 'site-static-v3';
const dynamicCache = 'site-dynamic-v1';
const assets =[
    '/',
    '/index.html',
    '/128.png',
    '/js/app.js',
    '/pages/fallback.html'
]
self.addEventListener('install', async(evt) => {
    //console.log('ok');
    await evt.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('caching assets')
            cache.addAll(assets).then().catch(err=>(console.log(err)))
        })
    )
})

self.addEventListener('activate', evt => {
    //console.log('activate')
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys)
            return Promise.all(keys
                .filter(key => key!==cacheName && key!==dynamicCache)
                .map(key => caches.delete(key))
                )
        })
    )
})

self.addEventListener('fetch', async (evt) => {
    await evt.respondWith(async () => {
        const cachedResponse = await caches.match(evt.request);
    if (cachedResponse) return cachedResponse;
    const response = await fetch(evt.request).then(()=>{return response})

    // if (response) {
    //     return response;
    // }
    });
 })


// evt.respondWith(
//     caches.match(evt.request).then(cacheRes => {
//     return cacheRes || fetch(evt.request).then().catch(err => console.log(err)) //error

// })
// )



