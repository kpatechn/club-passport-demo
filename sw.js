// Club Passport demo: works offline once it has been opened online.
// Built by tools/sync.py. The version changes whenever the files below change.
const V='cp-d09d19cf97';
const CORE=["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "assets/img/ar-hero.jpg", "assets/img/ar-lobby.jpg", "assets/img/ct-2.jpg", "assets/img/ct-hero.jpg", "assets/img/d-chips.jpg", "assets/img/d-cowboys.jpg", "assets/img/d-granvia.jpg", "assets/img/d-kirbys.jpg", "assets/img/d-mickey.jpg", "assets/img/d-neonpig.jpg", "assets/img/d-rotunda.jpg", "assets/img/d-toby.jpg", "assets/img/d-vinos.jpg", "assets/img/e-cardenales.jpg", "assets/img/e-fogerty.jpg", "assets/img/e-harvest.jpg", "assets/img/e-jodeci.jpg", "assets/img/e-lamafia.jpg", "assets/img/e-ricky.jpg", "assets/img/e-staind.jpg", "assets/img/e-tomjones.jpg", "assets/img/e-tucanes.jpg", "assets/img/e-wutang.jpg", "assets/img/lc-2.jpg", "assets/img/lc-hero.jpg", "assets/img/ms-bar.jpg", "assets/img/ms-games.jpg", "assets/img/ms-hero.jpg", "assets/img/nc-floor.jpg", "assets/img/nc-hero.jpg", "assets/img/rs-floor.jpg", "assets/img/rs-hero.jpg", "assets/img/rw-hero.jpg", "assets/img/rw-show.jpg", "assets/img/s-inn.jpg", "assets/img/s-rv.jpg", "assets/img/sc-2.jpg", "assets/img/sc-hero.jpg", "assets/img/tv-dine.jpg", "assets/img/tv-hero.jpg", "assets/img/wb-hero.jpg", "assets/img/wb-hotel.jpg", "assets/img/wc-sea.jpg", "assets/img/wc-title.png", "assets/img/ws-dining.jpg", "assets/img/ws-gaming.jpg", "assets/img/ws-globe.jpg", "assets/img/ws-hero.jpg", "assets/img/ws-pool.jpg", "assets/img/ws-show.jpg", "assets/img/ws-spa.jpg", "assets/img/ws-stay.jpg", "assets/img/ws-tables.jpg", "assets/logo/ar-logo.svg", "assets/logo/ct-logo.png", "assets/logo/lc-logo.png", "assets/logo/lc-logo2.png", "assets/logo/ms-logo.png", "assets/logo/nc-logo.png", "assets/logo/nc-logo.svg", "assets/logo/rs-logo.png", "assets/logo/rw-logo.png", "assets/logo/rw-logo2.png", "assets/logo/sc-logo.png", "assets/logo/tv-logo.png", "assets/logo/wb-logo.svg", "assets/logo/wb-logo2.png", "assets/logo/ws-logo.svg"];
const FONT=/(^|\.)fonts\.(googleapis|gstatic)\.com$/;
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url),font=FONT.test(u.hostname);
 if(u.origin!==location.origin&&!font)return; // games and ticket sites always need the network
 if(r.mode==='navigate'){
  // Fresh page when online (so updates show up), saved copy when offline or on a slow network.
  const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp))}return res});
  const slow=new Promise(ok=>setTimeout(ok,3500)).then(()=>caches.match('index.html'));
  e.respondWith(Promise.race([net.catch(()=>caches.match('index.html')),slow.then(hit=>hit||net)]));return}
 e.respondWith(caches.match(r,{ignoreSearch:!font}).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})));
});
