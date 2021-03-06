//current day display
var m = moment();
var currentDayTime = m.format("LLLL");

$("#currentDay").text(currentDayTime);

//work time display
let workTime = {
  "8 AM": "",
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};

$(document).ready(function(){
  if(!localStorage.getItem('workTime')) {
    updateCalendarTasks(workTime);
  } else {
    updateCalendarTasks(JSON.parse(localStorage.getItem('workTime')));
  }
})

//calculate work time based on current hour
let counter = 1;
for(const property in workTime) {
  let textEntry = "#textarea" + counter;
  $(textEntry).text(workTime[property]);
  let timeId = "#time" + counter;
  let currentHour = moment().hour();
  let timeString = $(timeId).text();
  let timeNumber = hourNumberFromHourString(timeString);  
  if(timeNumber < currentHour) {
    $(textEntry).addClass("past");
  } else if (timeNumber > currentHour) {
    $(textEntry).addClass("future");
  } else {
    $(textEntry).addClass("current");
  }
  counter ++;
}

$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();
  
  saveSchedule(hourString, value);
});

function hourNumberFromHourString(hourString) {
  switch(hourString) {
    case "8 AM": return 8;
    case "9 AM": return 9;
    case "10 AM": return 10;
    case "11 AM": return 11;
    case "12 PM": return 12;
    case "1 PM": return 13;
    case "2 PM": return 14;
    case "3 PM": return 15;
    case "4 PM": return 16;
    case "5 PM": return 17;
  }
}

//save work text entry to local storage
function loadCorrectDataset() {
  result = localStorage.getItem('workTime')
  return (result ? result : workTime);
}

function initializeLocalStorage() {
  localStorage.setItem('workTime', JSON.stringify(workTime));
};

function saveToLocalStorage(dayObj) {
  localStorage.setItem('workTime', JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {
  if(!localStorage.getItem('workTime')) {
    initializeLocalStorage();
  }

  let workHours = JSON.parse(localStorage.getItem('workTime'));
  workHours[hourString] = val

  saveToLocalStorage(workHours);
}

function updateCalendarTasks(dayObject) {
  $(".calendar-row").each(function(index) {
    let res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
  })
}