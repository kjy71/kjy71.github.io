const clock = document.querySelector("h2#clock");

function pad(somi) {
  //const newstring = String(somi);
  const stringf = String(somi).padStart(2, "0");
  return stringf;
}

function getClock() {
  const date = new Date();
  clock.innerText = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}
getClock();
setInterval(getClock, 1000);
