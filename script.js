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
  for (var i = 0; i < 60; i += 15) {
    var si
    if (i < 10) {
      si = '0' + i
    } else {
      si = i
    }
    let optionString = `<option value="${si}">${si}</option>`
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
  // minListSingleStepForTest()   // < --- it is just used for testing only
  minList() // Minute list has 5 min leaps inspired by mobile fone 5 min leap
  secList() // Second list has 15 second leap
})()
/** List Hour & Min list added to page */

/* Formating dates */
function formatAMPM(date) {
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm
  return strTime
}

/** Setting The Current time */
;(function settingCurrentTime() {
  function getCurrentTime() {
    let d = formatAMPM(new Date())
    let [timeArr, meridian] = d.split(' ')
    let [hour, minute, second] = timeArr.split(':')
    if (hour < 10) {
      hour = '0' + hour
    }
    currentTimeMeridian.innerText = meridian.toUpperCase()

    return `${hour}:${minute}:${second}`
  }

  function setCurrentTime() {
    let currentTimeString = getCurrentTime()

    timeSpan.innerHTML = currentTimeString
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

// defines alarm identity.. help to identify an alarm from multiple alarms
let alarmId = localStorage.length + 1

setAlarmBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (setHour.value != '' && setMin.value != '' && setSec.value != '') {
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
    runTimerFunction(newAlarm, alarmId)
    /** End Alarm Alert */
    alarmId++
  } else {
    alert('You are missing with selecting any of hr , min or sec,.Please Select Appropriate set of time first !!! ')
  }
})

/** Add Timer function */
function runTimerFunction(newAlarm, id) {
  let alarmBox = document.querySelector(`#Alarm${id}`)
  let interval = setInterval(function () {
    let alarmHasDeleted = alarmBox.getAttribute('data-deleted')
    if (alarmHasDeleted === 'true') {
      clearInterval(interval)
    }
    let d = formatAMPM(new Date())
    let timeArr = d.split(' ')
    let [newAlarmTime, meridian] = timeArr
    let [h, m, s] = newAlarmTime.split(':')
    if (
      +h === +newAlarm.hour &&
      +m === +newAlarm.min &&
      +s === +newAlarm.sec &&
      meridian === newAlarm.meridian
    ) {
      alert(`Alarm${id} is ringing`)
      localStorage.removeItem(`Alarm${id}`)
      clearInterval(interval)
      alarmBox.remove()
    }
  }, 1000)
}

/** Displaying Alarm in the Window */

function displayAlarm(showAlarm, deleteId) {
  // diplay Example ...   [ 12:32:45 pm                  Delete ]

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
      this.parentElement.setAttribute('data-deleted', true)
      this.parentElement.remove()
      // location.reload()
    }
  }
  /** End for setting deleteBtn html with name - deleteBtnSpan - */

  /** Perent Div for Time & deleteBtn span */

  // Alarm div
  let alarmBox = document.createElement('div')
  const alarmBoxAtt = document.createAttribute('class')
  const alarmBoxIdAtt = document.createAttribute('id')
  alarmBoxIdAtt.value = deleteId
  const alarmBoxExistAtt = document.createAttribute('data-deleted')
  alarmBoxExistAtt.value = false
  alarmBoxAtt.value =
    'alarm-box text-lg px-2 rounded-xl border-2 w-4/5 mx-auto flex justify-between'
  alarmBox.setAttributeNode(alarmBoxAtt)
  alarmBox.setAttributeNode(alarmBoxIdAtt)
  alarmBox.setAttributeNode(alarmBoxExistAtt)
  /** End for setting up parent div for timeSpan & deleteBtn span */

  alarmBox.appendChild(timeSpan)
  alarmBox.appendChild(deleteBtnSpan)
  alarmsListContainer.appendChild(alarmBox)
}

/* loop for the list of alarms stored in local storage */

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i)
  let alarmFromStorage = localStorage.getItem(key)
  let currentAlarm = JSON.parse(alarmFromStorage)

  displayAlarm(currentAlarm, key)
}
