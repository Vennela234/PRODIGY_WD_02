let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const laps = document.getElementById('laps');

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 10);
    startStopBtn.innerText = "Pause";
    running = true;
  } else {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    startStopBtn.innerText = "Start";
    running = false;
  }
}

function reset() {
  clearInterval(tInterval);
  display.innerHTML = "00:00:00";
  difference = 0;
  running = false;
  startStopBtn.innerText = "Start";
  laps.innerHTML = "";
  lapCount = 1;
}

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((updatedTime % 1000) / 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

  display.innerHTML = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
  if (running) {
    const li = document.createElement('li');
    li.innerText = `Lap ${lapCount}: ${display.innerHTML}`;
    laps.appendChild(li);
    lapCount++;
  }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
