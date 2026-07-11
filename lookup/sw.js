/* Service worker เฉพาะโมดูล "ค้นหาข้อมูล" — scope = /eecalc/lookup/ เท่านั้น
   สำคัญ: ลบเฉพาะแคชที่ขึ้นต้นด้วย eicalc-lookup- จึงไม่แตะแคชของแอปหลัก (v10) */
const CACHE='eicalc-lookup-v2';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k.startsWith('eicalc-lookup-') && k!==CACHE).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
