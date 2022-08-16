
# Simple Alarm Clock

It is a clock that is designed to alert user at a specified time.
This app has current time running constantly so that user can set an alarm accordingly
it has clock face,dropdowns,set button to set an alarm (refer screenshot section)

## Screenshots

    Here is the first look when the app is launched or in idle state 
![App Screenshot](./idle.jpg)

    User can set time for an alarm through these dropdowns
![App Screenshot](./dropdown.jpg)

    Alarms set by user are listed below
![App Screenshot](./alarm-list.jpg)

    click on set , user will get an alert ensuring your alarm is set 
![App Screenshot](./set.jpg)


    this is how user will get an alert about alarm set by user is ringing & never gonna ring again
![App Screenshot](./ring.jpg)



## Features

- Clock face
    - Clock shows the current time

- Set Alarm
    - It has select option boxes to set an alarm (hr,min,sec, am/pm)
    - Once the time is set by clicking at “Set Alarm” button, alarm will be added to the alarms list below
    - When the alarm goes of it's just uses JS alert function to alert in the browser

- Alarms list
    - Display a list of all the alarms set by user

- Delete alarm
    - For each alarm there is a dedicated delete button to delete the alarm
    - When the user deletes an alarm it does not alert the user & does not appear in alarm list
    - alarm will be deleted only after user's confirmation

## Limitations

- This Simple Alarm Clock requires internet to work properly
- This app uses local Storage to stores alarms
- Refeshing the page breaks the alarm's timer i.e.., if user sets an alarm & page get refreshed in anyway ., set alarms will not be ringing.
- User need to stick to the page set alarm does not keep running in background
- Styling Given to the app works upon mostly used browsers with thier latest version such as chrome , firefox , edge , brave , etc...   



## Technology Used

- HTML
- CSS
- JAVASCRIPT
- TAILWIND CSS ( css framework )
## Author

- [@hishamkhan](https://github.com/hisham8989)

## Hosted Link
- https://hisham8989.github.io/myalarm/

