const CACHE_NAME = "version-1"
const urlsToCache = ["index.html","offline.html"]
this.addEventListener('install',(event)=>{
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache)=>{
                console.log("Opened cache ")
            })
        )
})
this.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request).then((res)=>{
            return fetch(event.request).catch(()=>catches.match('offline.html'))
        })
    )
})
this.addEventListener('activate',(event)=>{
    const cacheWhiteList = []
    cacheWhiteList.push.push(CACHE_NAME)
    event.waitUntil(caches.keys().then((cacheNames)=>Promise.all(
        cacheNames.map((cacheName)=>{
            if(!cacheWhiteList.includes(cacheName)){
                return cacheWhiteList.delete(cacheName);
            }
        })
    )))
})