let currentTime = document.getElementById('current-time')
let currentTimeMeridian = document.querySelector('#time-meridian')
let timeSpan = document.querySelector('#time-span')
let setHour = document.querySelector('#set-hour')
let setMin = document.querySelector('#set-min')
let setMeridian = document.querySelector('#set-meridian')
let setAlarmBtn = document.querySelector('#set-alarm')

/** Defining Hour & Min option Dynamacally */
var getMinList;
var getHourList;

function hourList() {
  for(var i = 1 ; i<=12;i++){
    let optionString =`<option value="${i}">${i}</option>`
    setHour.insertAdjacentHTML( 'beforeend', optionString );
  }
  getHourList = document.querySelectorAll('#set-hour option')
}
function minList() {
  for(var i = 5 ; i<=60;i=i+5){
    let optionString =`<option value="${i}">${i}</option>`
    setMin.insertAdjacentHTML( 'beforeend', optionString );
  }
  getMinList = document.querySelectorAll('#set-min option')
}
/** Firing List of hours & Min */
(function fireOptions(){
  hourList();
  minList();
})();
/** List Hour & Min list added to page */


/** Setting The Current time */
(function settingCurrentTime(){
  function getCurrentTime() {
    let today = new Date()
    let hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours()
    let minute =
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
    let second =
      today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds()
  
    if (hour > 12) {
      hour = hour - 12
    }else{
      currentTimeMeridian.innerText = 'AM'
    }
    return hour + ':' + minute + ':' + second
  }
  
  function setCurrentTime() {
    let currentTimeString = getCurrentTime()
  
    timeSpan.innerText = currentTimeString
  }
  
  
  let interval = setInterval(setCurrentTime, 1000)
  
})();
/** Current Time Is Running On the page */


/** Defining Class for alarm */
class Alarm {
  constructor(hour,min, meridian) {
    this.hour = hour;
    this.min = min;
    this.meridian = meridian;
  }
}

let alarmId = localStorage.length+1;
setAlarmBtn.addEventListener('click',(e)=>{
  e.preventDefault()
  if(setHour.value>0 && setMin.value>0){
    let newAlarm = new Alarm(setHour.value,setMin.value,setMeridian.value)
    let storingObj = JSON.stringify(newAlarm);
    localStorage.setItem(`Alarm${alarmId}`, storingObj);
    alert(`Alarm${alarmId} Added`)
    alarmId++;
  }
  
})