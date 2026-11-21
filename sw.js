// Van Vuursteen tot Vorst: always fetch the newest game, fall back to the last copy when offline.
const CACHE='vvtv-1';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./','icon-192.png','manifest.webmanifest']).catch(()=>{}))); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => { const u=new URL(e.request.url);
  if(e.request.method!=='GET' || u.origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(r => { if(r.ok){ const cp=r.clone(); caches.open(CACHE).then(c => c.put(e.request,cp)); } return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('./')))); });
