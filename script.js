let currentTime = document.getElementById('current-time')
let currentTimeMeridian = document.querySelector('#time-meridian')
let timeSpan = document.querySelector('#time-span')
let setHour = document.querySelector('#set-hour')
let setMin = document.querySelector('#set-min')
let setMeridian = document.querySelector('#set-meridian')
let setAlarmBtn = document.querySelector('#set-alarm')
let alarmsListContainer = document.querySelector('.alarms-list-container')

/** Defining Hour & Min option Dynamacally */
var getMinList
var getHourList

function hourList() {
  for (var i = 1; i <= 12; i++) {
    let optionString = `<option value="${i}">${i}</option>`
    setHour.insertAdjacentHTML('beforeend', optionString)
  }
  getHourList = document.querySelectorAll('#set-hour option')
}
function minList() {
  for (var i = 5; i <= 60; i = i + 5) {
    let optionString = `<option value="${i}">${i}</option>`
    setMin.insertAdjacentHTML('beforeend', optionString)
  }
  getMinList = document.querySelectorAll('#set-min option')
}
/** Firing List of hours & Min */
;(function fireOptions() {
  hourList()
  minList()
})()
/** List Hour & Min list added to page */

/** Setting The Current time */
;(function settingCurrentTime() {
  function getCurrentTime() {
    let today = new Date()
    let hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours()
    let minute =
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
    let second =
      today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds()

    if (hour > 12) {
      hour = hour - 12
      currentTimeMeridian.innerText = 'PM'
    } else {
      currentTimeMeridian.innerText = 'AM'
    }
    return hour + ':' + minute + ':' + second
  }

  function setCurrentTime() {
    let currentTimeString = getCurrentTime()

    timeSpan.innerText = currentTimeString
  }

  let interval = setInterval(setCurrentTime, 1000)
})()
/** Current Time Is Running On the page */

/** Defining Class for alarm */
class Alarm {
  constructor(hour, min, meridian) {
    this.hour = hour
    this.min = min
    this.meridian = meridian
  }
}

let alarmId = localStorage.length + 1
setAlarmBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (setHour.value > 0 && setMin.value > 0) {
    let newAlarm = new Alarm(setHour.value, setMin.value, setMeridian.value)
    let storingObj = JSON.stringify(newAlarm)
    localStorage.setItem(`Alarm${alarmId}`, storingObj)
    alert(`Alarm${alarmId} Added`)
    // location.reload();

    let showAlarm = JSON.parse(localStorage.getItem(`Alarm${alarmId}`))
    displayAlarm(showAlarm,`Alarm${alarmId}`)

    alarmId++
  }
})

function displayAlarm(showAlarm,deleteId) {
  /** The time Time text */

  let timeSpan = document.createElement('span')
  const timeSpanAtt = document.createAttribute('class')
  timeSpanAtt.value = 'p-2 cursor-default'
  timeSpan.setAttributeNode(timeSpanAtt)
  const timeTextNode = document.createTextNode(
    `${showAlarm.hour}:${showAlarm.min} ${showAlarm.meridian}`
  )
  timeSpan.appendChild(timeTextNode)

  /** End for setting time html with name - timeSpan - */

  /** The time Meridian text */

  let deleteBtnSpan = document.createElement('span')
  const deleteBtnSpanAtt = document.createAttribute('class')
  deleteBtnSpanAtt.value = 'p-2 cursor-pointer'
  const deleteBtnSpanDataAtt = document.createAttribute('data-deleteId')
  deleteBtnSpanDataAtt.value = deleteId;
  deleteBtnSpan.setAttributeNode(deleteBtnSpanAtt)
  deleteBtnSpan.setAttributeNode(deleteBtnSpanDataAtt)
  const deleteBtnTextNode = document.createTextNode(`Delete`)
  deleteBtnSpan.appendChild(deleteBtnTextNode)

  deleteBtnSpan.onclick = function () {
    // this.parentElement.removeChild(this);
    let attr = this.getAttribute('data-deleteId');
    if(confirm("Press Ok To Delete Alarm Parmanently...")){
      localStorage.removeItem(attr)
      location.reload()
    } 
    
};
  /** End for setting deleteBtn html with name - deleteBtnSpan - */

  /** Perent Div for Time & deleteBtn span */

  // Alarm div
  let alarmBox = document.createElement('div')
  const alarmBoxAtt = document.createAttribute('class')
  alarmBoxAtt.value =
    'alarm-box text-lg px-2 rounded-xl border-2 w-4/5 mx-auto flex justify-between'
  alarmBox.setAttributeNode(alarmBoxAtt)
/** End for setting up parent div for timeSpan & deleteBtn span */

  alarmBox.appendChild(timeSpan)
  alarmBox.appendChild(deleteBtnSpan)
  alarmsListContainer.appendChild(alarmBox)
}

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  let alarmFromStorage = localStorage.getItem(key)
  let currentAlarm = JSON.parse(alarmFromStorage)
  displayAlarm(currentAlarm,key)
}

// if(localStorage.length===0){
//   let alarmHtml = `<div
//   class="alarm-box text-lg px-2 rounded-xl border-2 w-4/5 mx-auto flex justify-center"
// >
//   <span class="text-center">No Alarm is set </span>`
//   console.log('hi');
//   alarmsListContainer.innerHTML = alarmHtml
// }
// // console.log(localStorage.getItem('Alarm1'))
