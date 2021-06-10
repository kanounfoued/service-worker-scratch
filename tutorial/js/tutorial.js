const inputField = document.getElementById("number");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

var value = "";

var worker;

inputField.onkeyup = (e) => {
  value = e.target.value;
};

function insertDom(currentFact, fact) {
  const div = document.createElement("div");
  div.textContent = `index: ${currentFact} => fibonacci: ${fact}`;
  document.body.appendChild(div);
}

startBtn.onclick = () => {
  startBtn.setAttribute("disabled", true);
  stopBtn.classList.remove("hidden");

  //   start running the web worker on the background.
  // Web worker does not have access to the DOM.
  // instead it does have access to the network things (make communication with the server).
  worker = new Worker("/tutorial/js/worker.js");

  worker.addEventListener("message", (e) => {
    const { currentIndex, fib } = e.data;
    insertDom(currentIndex, fib);
  });
  worker.postMessage("Start Evaluating factorial");
};

stopBtn.onclick = () => {
  startBtn.removeAttribute("disabled");
  stopBtn.classList.add("hidden");
  worker.terminate();
};
