"use strict";

// this variable is used for versioning, and the purpose is just to re-create a new service worker.
// make an update to update the service worker.
const version = 1;

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);

main().catch(console.error);

async function main() {
  console.log(`Service Worker (${version}) is starting ...`);
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
  await clients.claim();
  console.log(`Service Worker (${version}) activated`);
}
