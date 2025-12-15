// ./js/clock.js

const clockElement = document.querySelector("#clock");

function formatTimeUnit(unit) {
  return String(unit).padStart(2, "0");
}

function updateClock() {
  const now = new Date();
  const hours = formatTimeUnit(now.getHours());
  const minutes = formatTimeUnit(now.getMinutes());
  const seconds = formatTimeUnit(now.getSeconds());

  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// 최초 1회 즉시 실행 + 1초마다 업데이트
updateClock();
setInterval(updateClock, 1000);
