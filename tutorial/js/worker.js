// Any data sent or received is a copy of the original one. (by copy not by reference).

var currentIndex = 0;

// send a message to the page, from where the worker was called.
// self.postMessage("Hello there from web worker.");

// receive the message sent from the page, where it was called.
self.onmessage = (e) => {
  nextFibonacci();
};

function nextFibonacci() {
  const fib = fibonacci(currentIndex);
  self.postMessage({ currentIndex, fib });
  currentIndex++;
  nextFibonacci();
}

function fibonacci(num) {
  if (num === 0 || num === 1) return 1;
  else return fibonacci(num - 1) + fibonacci(num - 2);
}
