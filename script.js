let currentTime = document.getElementById('current-time')
let currentTimeMeridian = document.querySelector('#time-meridian')
let timeSpan = document.querySelector('#time-span')
let setHour = document.querySelector('#set-hour')
let setMin = document.querySelector('#set-min')
let setSec = document.querySelector('#set-sec')
let setMeridian = document.querySelector('#set-meridian')
let setAlarmBtn = document.querySelector('#set-alarm')
let alarmsListContainer = document.querySelector('.alarms-list-container')

/** Defining Hour & Min option Dynamacally */
function hourList() {
  for (var i = 1; i <= 12; i++) {
    if (i < 10) {
      i = '0' + i
    }
    let optionString = `<option value="${i}">${i}</option>`
    setHour.insertAdjacentHTML('beforeend', optionString)
  }
}
function minList() {
  for (var i = 0; i < 60; i += 5) {
    var mi
    if (i < 10) {
      mi = '0' + i
    } else {
      mi = i
    }
    let optionString = `<option value="${mi}">${mi}</option>`
    setMin.insertAdjacentHTML('beforeend', optionString)
  }
}
function secList() {
  for (var i = 0; i < 60; i++) {
    if (i < 10) {
      i = '0' + i
    }
    let optionString = `<option value="${i}">${i}</option>`
    setSec.insertAdjacentHTML('beforeend', optionString)
  }
}

function minListSingleStepForTest() {
  for (var i = 0; i < 60; i++) {
    
    let optionString = `<option value="${i}">${i}</option>`
    setMin.insertAdjacentHTML('beforeend', optionString)
  }
}
/** Firing List of hours & Min */
;(function fireOptions() {
  hourList()
  minListSingleStepForTest()
  // minList()
  secList()
})()
/** List Hour & Min list added to page */

/** Setting The Current time */
;(function settingCurrentTime() {
  function getCurrentTime() {
    let d = new Date().toLocaleTimeString().split(' ')
let timeArr = d[0].split(':');
    let hour = timeArr[0]
    let minute = timeArr[1]
    let second = timeArr[2]
    if (hour < 10) {
      hour = '0' + hour
    }
    currentTimeMeridian.innerText = d[1].toUpperCase()

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
  constructor(hour, min, sec, meridian) {
    this.hour = hour
    this.min = min
    this.sec = sec
    this.meridian = meridian
  }
}

let alarmId = localStorage.length + 1
setAlarmBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (setHour.value > 0 && setMin.value >= 0 && setSec.value >= 0) {
    let newAlarm = new Alarm(
      setHour.value,
      setMin.value,
      setSec.value,
      setMeridian.value
    )

    let storingObj = JSON.stringify(newAlarm)
    localStorage.setItem(`Alarm${alarmId}`, storingObj)
    alert(`Alarm${alarmId} Added`)

    let showAlarm = JSON.parse(localStorage.getItem(`Alarm${alarmId}`))
    displayAlarm(showAlarm, `Alarm${alarmId}`)
    /** setting alarm alert */
    runTimerFunction(newAlarm,alarmId)
    /** End Alarm Alert */
    alarmId++


  }
})


/** Add Timer function */
function runTimerFunction(newAlarm,id) {
  let interval = setInterval(function () {
    let d = new Date().toLocaleTimeString()
    let [newAlarmTime,meridian] = d.split(' ')
    let [h,m,s] = newAlarmTime.split(':')
    if (+h === +newAlarm.hour && +m === +newAlarm.min && +s === +newAlarm.sec && meridian === newAlarm.meridian) {
      alert(`Alarm${id} is ringing`)
      localStorage.removeItem(`Alarm${id}`);
      clearInterval(interval)
      location.reload()
    }
  }, 1000)
  
}

/** Displaying Alarm in the Window */

function displayAlarm(showAlarm, deleteId) {
  /** The Alarm Time text */

  let timeSpan = document.createElement('span')
  const timeSpanAtt = document.createAttribute('class')
  timeSpanAtt.value = 'p-2 cursor-default'
  timeSpan.setAttributeNode(timeSpanAtt)
  const timeTextNode = document.createTextNode(
    `${showAlarm.hour} : ${showAlarm.min} : ${showAlarm.sec} ${showAlarm.meridian}`
  )
  timeSpan.appendChild(timeTextNode)

  /** End for setting time html with name - timeSpan - */

  /** The time Meridian text */

  let deleteBtnSpan = document.createElement('span')
  const deleteBtnSpanAtt = document.createAttribute('class')
  deleteBtnSpanAtt.value = 'p-2 cursor-pointer'
  const deleteBtnSpanDataAtt = document.createAttribute('data-deleteId')
  deleteBtnSpanDataAtt.value = deleteId
  deleteBtnSpan.setAttributeNode(deleteBtnSpanAtt)
  deleteBtnSpan.setAttributeNode(deleteBtnSpanDataAtt)
  const deleteBtnTextNode = document.createTextNode(`Delete`)
  deleteBtnSpan.appendChild(deleteBtnTextNode)

  deleteBtnSpan.onclick = function () {
    // this.parentElement.removeChild(this);
    let attr = this.getAttribute('data-deleteId')
    if (confirm('Press Ok To Delete ' + deleteId + ' Parmanently...')) {
      localStorage.removeItem(attr)
      location.reload()
    }
  }
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
  let key = localStorage.key(i)
  let alarmFromStorage = localStorage.getItem(key)
  let currentAlarm = JSON.parse(alarmFromStorage)

  displayAlarm(currentAlarm, key)
}
