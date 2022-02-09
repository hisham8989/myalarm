let currentTime = document.getElementById("current-time");
let currentTimeMeridian = document.querySelector("#time-meridian");
let timeSpan = document.querySelector("#time-span");

function getCurrentTime() {
    let today = new Date();
    let hour = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    let minute =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    let second =
      today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
  
    if (hour > 12) {
      hour = hour - 12;
    }
    return hour + ":" + minute + ":" + second;
  }

function setCurrentTime() {
    let currentTimeString = getCurrentTime();
    if (currentTimeString.split(":")[0] < 12) {
      currentTimeMeridian.innerText = "AM";
    }
    timeSpan.innerText = currentTimeString;
  }
let interval = setInterval(setCurrentTime, 1000);