// Saves the app files so it opens offline once installed
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open("life-v1").then(function (c) { return c.addAll(["index.html", "manifest.json", "icon-192.png"]); }));
});
self.addEventListener("fetch", function (e) {
  e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request); }));
});
