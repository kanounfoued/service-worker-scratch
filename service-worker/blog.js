/**
 * 1 detecting user online/offline.
 * 2 Register and install Service Worker.
 */

(function Blog() {
  "use strict";

  var offlineIcon;
  var isOnline = "onLine" in navigator ? navigator.onLine : true;
  var isLoggedIn = /isLoggedIn=1/.test(document.cookie.toString() || "");
  var usingSW = "serviceWorker" in navigator;
  var swRegistration;
  var svcWorker;

  document.addEventListener("DOMContentLoaded", ready, false);

  initServiceWorker().catch(console.error);

  // when the DOM content has been loaded.
  function ready() {
    offlineIcon = document.getElementById("connectivity-status");
    var statusValue = document.getElementById("status-value");
    statusValue.textContent = isOnline;

    // check if the device is online or not.
    if (!isOnline) {
      // show the offline icon, if the device is not online.
      offlineIcon.classList.remove("hidden");
    }

    window.addEventListener("online", function () {
      offlineIcon.classList.add("hidden");
      isOnline = true;
      statusValue.textContent = isOnline;
    });

    window.addEventListener("offline", function () {
      offlineIcon.classList.add("hidden");
      isOnline = false;
      statusValue.textContent = isOnline;
    });
  }

  //   initialize the service worker.
  async function initServiceWorker() {
    swRegistration = await navigator.serviceWorker("./sw.js", {
      updateViaCache: false,
    });
  }
})();
