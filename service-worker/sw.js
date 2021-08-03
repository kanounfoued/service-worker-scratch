// "use strict";

// this variable is used for versioning, and the purpose is just to re-create a new service worker.
// make an update to update the service worker.
const version = 2;

let isOnline = true;
let isLoggedIn = false;

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);

main().catch(console.error);

async function main() {
  console.log(`Service Worker (${version}) is starting ...`);
  await sendMessage({ requestStateUpdate: true });
}

async function onInstall(e) {
  console.log(`Service Worker (${version}) installed`);
  //   kill the old service worker and start the new one immediately.
  self.skipWaiting();
}

async function onActivate(e) {
  // inform the browser to not shutting down somethings, until you do some stuff for activation.
  // getting resources ...
  e.waitUntil(handleActivation());
}

async function handleActivation() {
  await self.clients.claim();
  console.log(`Service Worker (${version}) activated`);
}

async function sendMessage(msg) {
  if (self.clients) {
    let allClients = await self.clients.matchAll({ includeUncontrolled: true });
    return Promise.all(
      allClients.map((client) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = onMessage;
        return client.postMessage(msg, [channel.port2]);
      })
    );
  }
}

function onMessage({ data }) {
  if (data.statusUpdate) {
    const { isOnline, isLoggedIn } = data.statusUpdate;
    console.log(
      `Service Worker (V${version}) status update... , isOnline:${isOnline}, isLoggedIn:${isLoggedIn}`
    );
  }
}
