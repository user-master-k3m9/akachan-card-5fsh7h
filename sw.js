// 通信できるときは最新の版を取りに行き（3.5秒で返事がなければ保存済みの版）、
// 通信できないときは保存済みの版で動かす。localStorage・IndexedDB には触らない
const VER = "babycards-v5";
const SHELL = ["./", "index.html", "cards.js", "scenes.js", "photos.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "maskable-512.png", "apple-touch-icon.png", "p-s2-boushi.jpg", "p-s2-cup.jpg", "p-s2-fuusen.jpg", "p-s2-garagara.jpg", "p-s2-haburashi.jpg", "p-s2-hon.jpg", "p-s2-kutsu.jpg", "p-s2-ofuro.jpg", "p-s2-spoon.jpg", "p-s3-banana.jpg", "p-s3-budou.jpg", "p-s3-bus.jpg", "p-s3-buta.jpg", "p-s3-densha.jpg", "p-s3-fune.jpg", "p-s3-gohan.jpg", "p-s3-hikouki.jpg", "p-s3-hiyoko.jpg", "p-s3-ichigo.jpg", "p-s3-inu.jpg", "p-s3-jitensha.jpg", "p-s3-kaeru.jpg", "p-s3-kotori.jpg", "p-s3-kuma.jpg", "p-s3-kuruma.jpg", "p-s3-kyuukyuusha.jpg", "p-s3-lion.jpg", "p-s3-mikan.jpg", "p-s3-neko.jpg", "p-s3-ninjin.jpg", "p-s3-onigiri.jpg", "p-s3-pan.jpg", "p-s3-panda.jpg", "p-s3-patoka.jpg", "p-s3-ringo.jpg", "p-s3-sakana.jpg", "p-s3-saru.jpg", "p-s3-shoubousha.jpg", "p-s3-tamago.jpg", "p-s3-tomato.jpg", "p-s3-usagi.jpg", "p-s3-ushi.jpg", "p-s3-zou.jpg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VER).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("babycards-") && k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
function fromNet(req, c) {
  return fetch(req, { cache: "no-cache" }).then(r => { if (r && r.ok) c.put(req, r.clone()); return r; });
}
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(caches.open(VER).then(c => new Promise(resolve => {
    let done = false;
    const fallback = async () => { if (done) return; const hit = (await c.match(req, { ignoreSearch: true })) || (await c.match("index.html")); if (hit && !done) { done = true; resolve(hit); } };
    const timer = setTimeout(fallback, 3500);
    fromNet(req, c).then(r => { if (!done) { done = true; clearTimeout(timer); resolve(r); } })
      .catch(async () => { clearTimeout(timer); await fallback(); if (!done) { done = true; resolve(Response.error()); } });
  })));
});
