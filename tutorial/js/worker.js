// send a message to the page, from where the worker was called.
self.postMessage("Hello there");

// receive the message sent from the page, where it was called.
self.onmessage = (e) => {
  console.log(e.data);
};
