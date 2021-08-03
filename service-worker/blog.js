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
      sendStatusUpdate();
    });

    window.addEventListener("offline", function () {
      offlineIcon.classList.add("hidden");
      isOnline = false;
      statusValue.textContent = isOnline;
      sendStatusUpdate();
    });
  }

  //   initialize the service worker.
  async function initServiceWorker() {
    swRegistration = await navigator.serviceWorker.register("./sw.js", {
      updateViaCache: "none",
    });

    // Lifecycles
    svcWorker =
      swRegistration.installing ||
      swRegistration.waiting ||
      swRegistration.active;

    sendStatusUpdate(svcWorker);

    /**
     *  INSTALLING :
     *  the server has never been installed, this is the first time.
     *  making a change to a service worker is considered as a whole new service worker, so it needs to be re-installed from scratch
     *  if we make a changes into a service worker that is already active, it will create a new instance in a waiting state for the first service worker instance to die.
     */

    //  Look for any new service worker has been installed.
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      svcWorker = navigator.serviceWorker.controller;
      sendStatusUpdate(svcWorker);
    });

    // listen to messages sent from the service worker.
    navigator.serviceWorker.addEventListener("message", onSWMessage);
  }

  function onSWMessage(e) {
    const { data } = e;

    if (data.requestStatusUpdate) {
      console.log(
        "Receive status udpate request from service worker, responding ..."
      );

      // e.ports are the ports used to make communication between the page and the service worker.
      // The e.ports are created using new feature called Channel.
      sendStatusUpdate(e.ports && e.ports[0]);
    }
  }

  function sendStatusUpdate(target) {
    sendSWMessage({ statusUpdate: { isOnline, isLoggedIn } }, target);
  }

  // send messages to service worker.
  function sendSWMessage(msg, target) {
    if (target) {
      target.postMessage(msg);
    } else if (svcWorker) {
      svcWorker.postMessage(msg);
    } else {
      navigator.serviceWorker.controller.postMessage(msg);
    }
  }
})();
