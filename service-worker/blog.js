/**
 * 1 detecting user online/offline.
 *
 */

(function Blog() {
  "use strict";

  var offlineIcon;
  var isOnline = "onLine" in navigator ? navigator.onLine : true;
  var isLoggedIn = /isLoggedIn=1/.test(document.cookie.toString());

  document.addEventListener("DOMContentLoaded", ready, false);

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
})();
