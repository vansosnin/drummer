let interval = 1000;
let timerID = null;

onmessage = (e) => {
  if (e.data === "start") {
    timerID = setInterval(() => {
      postMessage("tick");
    }, interval);
  } else if (e.data.interval) {
    interval = e.data.interval;
    if (timerID) {
      clearInterval(timerID);
      timerID = setInterval(() => {
        postMessage("tick");
      }, interval);
    }
  } else if (e.data === "stop") {
    clearInterval(timerID);
    timerID = null;
  }
};
