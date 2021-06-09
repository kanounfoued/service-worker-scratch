self.addEventListener("install", (event) => {
  console.log("V1 installing…");

  // cache a melon JPG
  event.waitUntil(
    caches.open("static-v1").then((cache) => cache.add("/melon.jpg"))
  );
});

self.addEventListener("activate", (event) => {
  console.log("V1 now ready to handle fetches!", event);
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // serve the cat JPG from the cache if the request is
  // same-origin and the path is '/straw.jpg'
  if (url.origin == location.origin && url.pathname == "/straw.jpg") {
    event.respondWith(caches.match("/melon.jpg"));
  }
});
