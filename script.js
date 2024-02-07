let date = new Date();
let miniDate = new Date();
let miniminiDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

let dates, days, extraDays;

const getDates = (dateInput) => {
  dateInput.setDate(1);

  const lastDay = new Date(
    dateInput.getFullYear(),
    dateInput.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    dateInput.getFullYear(),
    dateInput.getMonth(),
    0
  ).getDate();

  const firstDayIndex = dateInput.getDay();

  const lastDayIndex = new Date(
    dateInput.getFullYear(),
    dateInput.getMonth() + 1,
    0
  ).getDay();

  const nextDay = 7 - lastDayIndex - 1;

  let days = [];
  let dates = [];
  let currMY = [dateInput.getMonth() + 1, dateInput.getFullYear()];
  let prevMY = [], nextMY = [];
  if (currMY[0] == 1) {
    prevMY[0] = 12;
    prevMY[1] = currMY[1]-1;
  }
  else {
    prevMY[0] = currMY[0]-1;
    prevMY[1] = currMY[1];
  }

  if (currMY[0] == 12) {
    nextMY[0] = 1;
    nextMY[1] = currMY[1]+1;
  }
  else {
    nextMY[0] = currMY[0]+1;
    nextMY[1] = currMY[1];
  }

  for (let x = firstDayIndex; x > 0; x--) {
    days.push(`<div class="prev-date">${prevLastDay - x + 1}</div>`);
    dates.push(`d${prevLastDay - x + 1}-${prevMY[0]}-${prevMY[1]}`);
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      dateInput.getMonth() === new Date().getMonth() &&
      dateInput.getFullYear() === new Date().getFullYear()
    ) {
      days.push(`<div class="today">${i}</div>`);
      dates.push("today-date");
    } else {
      days.push(`<div class="date">${i}</div>`);
      dates.push(`d${i}-${currMY[0]}-${currMY[1]}`);
    }
  }

  for (let j = 1; j <= nextDay; j++) {
    days.push(`<div class="next-date">${j}</div>`);
    dates.push(`d${j}-${nextMY[0]}-${nextMY[1]}`);
  }

  let extraDays = [];
  if (days !== 6) {
    for (let j = nextDay+1; j <= nextDay+7; j++) {
      extraDays.push(`<div class="next-date">${j}</div>`);
    }
  }
  return [dates, days, extraDays];
};

const renderCalendar = () => {
  const monthDays = document.querySelector(".calendar");
  document.querySelector(".date p").innerHTML = months[date.getMonth()] + " " + date.getFullYear();

  [dates, days, extraDays] = getDates(date);
  document.querySelector(".calendar").style.gridTemplateRows = `repeat(${days.length/7}, 1fr)`;
  let daysElement = "";

  for (let i = 0; i < 7; i++) {
    daysElement += `<div class="date-box ${dates[i]}">${daysOfWeek[i] + days[i]}</div>`;
  }

  for (let i = 7; i < days.length; i++) {
    daysElement += `<div class="date-box ${dates[i]}">${days[i]}</div>`;
  }

  monthDays.innerHTML = daysElement;

  // Add event listener each date-box rendered in current month
  const dateBoxes = document.querySelectorAll(".date-box");

  dateBoxes.forEach((dateBox) => {
    dateBox.addEventListener("click", () => {
      let classList = dateBox.classList;
      openTaskWindow(classList[1]);
      renderTasksForDate(classList[1]);
    });
  });

  miniDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  renderMiniCalendar();
  renderMiniMiniCalendar();

}

const renderMiniCalendar = () => {
  const monthDays = document.querySelector(".mini-calendar");
  document.querySelector(".curr-date").innerHTML = months[miniDate.getMonth()] + " " + miniDate.getFullYear();

  let [dates, days, extraDays] = getDates(miniDate);
  if (days.length/7 !== 6) {
    days = days.concat(extraDays);
  };

  let daysElement =  `
      <div class="weekdays">S</div>
      <div class="weekdays">M</div>
      <div class="weekdays">T</div>
      <div class="weekdays">W</div>
      <div class="weekdays">T</div>
      <div class="weekdays">F</div>
      <div class="weekdays">S</div>
  `;
  for (let i = 0; i < days.length; i++) {
    daysElement += days[i];
  }
  monthDays.innerHTML = daysElement;
}


const renderMiniMiniCalendar = () => {
  const monthDays = document.querySelector(".minimini-calendar");
  document.querySelector(".currr-date").innerHTML = months[miniminiDate.getMonth()] + " " + miniminiDate.getFullYear();

  let [dates, days, extraDays] = getDates(miniminiDate);
  if (days.length/7 !== 6) {
    days = days.concat(extraDays);
  };

  let daysElement =  `
      <div class="weekdays">S</div>
      <div class="weekdays">M</div>
      <div class="weekdays">T</div>
      <div class="weekdays">W</div>
      <div class="weekdays">T</div>
      <div class="weekdays">F</div>
      <div class="weekdays">S</div>
  `;
  for (let i = 0; i < days.length; i++) {
    daysElement += days[i];
  }
  monthDays.innerHTML = daysElement;
}


document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

document.querySelector(".mini-left").addEventListener("click", () => {
  miniDate.setMonth(miniDate.getMonth() - 1);
  renderMiniCalendar();
});

document.querySelector(".mini-right").addEventListener("click", () => {
  miniDate.setMonth(miniDate.getMonth() + 1);
  renderMiniCalendar();
});


document.querySelector(".minimini-left").addEventListener("click", () => {
  miniminiDate.setMonth(miniminiDate.getMonth() - 1);
  renderMiniMiniCalendar();
});

document.querySelector(".minimini-right").addEventListener("click", () => {
  miniminiDate.setMonth(miniminiDate.getMonth() + 1);
  renderMiniMiniCalendar();
});


document.querySelector(".today-button").addEventListener("click", () => {
  const currDate = new Date();
  date.setFullYear(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
  renderCalendar();
});

document.getElementById("togC").addEventListener("click", () => {
  const checkBox = document.getElementById("togC");
  const arrow = document.querySelector(".collapsible-arrow");
  if (checkBox.checked) {
    arrow.classList.remove("fa-chevron-down");
    arrow.classList.add("fa-chevron-up");
  }
  else {
    arrow.classList.remove("fa-chevron-up");
    arrow.classList.add("fa-chevron-down");
  }
});


function openminiminicalendar(date) {
  const taskWindow = document.querySelector(".minimini-header");
  const width = 30, height = 60;
  taskWindow.style.width = width+"vw";
  taskWindow.style.height = height+"vh";

  const dateIndex = dates.findIndex((element) => { 
    // console.log(`'${element}'`, `'${date}'`, element==date);
    return element == date; 
  });

  const [row, col] = [Math.trunc(dateIndex/7), dateIndex%7];
  let leftVal = 18 + 82/7*(col+1);
  let topVal = 10 + 90/10;
  
  if (leftVal+width < 100) { 
    taskWindow.style.left = leftVal + "vw"; 
  }
  else {
    taskWindow.style.left = 100-(82/7*(7-col))-width + "vw";
  }
  taskWindow.style.top = topVal + "vh";

  if (taskWindow.style.display === "none") {
    taskWindow.style.display = "flex";
  }
  else {
    taskWindow.style.display = "none";
  }
  dateBoxValue = date;
}






let dateBoxValue = "";

function openTaskWindow(date) {
  const taskWindow = document.querySelector(".task-window");
  const width = 30, height = 60;
  taskWindow.style.width = width+"vw";
  taskWindow.style.height = height+"vh";

  const dateIndex = dates.findIndex((element) => { 
    // console.log(`'${element}'`, `'${date}'`, element==date);
    return element == date; 
  });

  const [row, col] = [Math.trunc(dateIndex/7), dateIndex%7];
  let leftVal = 18 + 82/7*(col+1);
  let topVal = 10 + 90/10;
  
  if (leftVal+width < 100) { 
    taskWindow.style.left = leftVal + "vw"; 
  }
  else {
    taskWindow.style.left = 100-(82/7*(7-col))-width + "vw";
  }
  taskWindow.style.top = topVal + "vh";

  if (taskWindow.style.display === "none") {
    taskWindow.style.display = "flex";
  }
  else {
    taskWindow.style.display = "none";
  }
  dateBoxValue = date;
}


function addTask(taskTitle) {
  const dateBox = document.querySelector(`.${dateBoxValue}`);
  const taskNode = document.createElement("div");
  taskNode.innerHTML = taskTitle;
  taskNode.style.width = "calc(70vw/7)";
  taskNode.style.height = "20px";
  taskNode.style.color = "white";
  taskNode.style.fontWeight = "500";
  taskNode.style.fontSize = "13px";
  taskNode.style.textAlign = "left";
  taskNode.style.backgroundColor = "#1967D2";
  taskNode.style.borderRadius = "2px";
  taskNode.style.padding = "0px";
  taskNode.style.margin = "5px 0px 0px 0px";
  dateBox.appendChild(taskNode);
  saveTaskToLocalStorage(taskTitle);
}

function saveTaskToLocalStorage(taskTitle) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(taskTitle);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.querySelector(".add-task").addEventListener("click", () => {
  const titleTextNode = document.querySelector(".title-text");
  const title = titleTextNode.value;
  titleTextNode.value = "";
  addTask(title);
  
  document.querySelector(".task-window").style.display = "none";
 
});

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".task-window").style.display = "none";
});

// const d = document.querySelector(".mini-calendar");
// document.querySelector(".date-display").innerHTML = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();


// const T = document.querySelector(".mini-calendar");
// const currentDate = new Date();

// // Use toLocaleString with options to get local time
// const localTimeString = currentDate.toLocaleString({ timeZone: 'America/New_York' });
// document.querySelector(".add-time-button").innerHTML = localTimeString;

function createTask() {
  // var taskInput = document.getElementById(".title-text").value;
  // if (taskInput.trim() !== "") {
    
  //   var popup = document.getElementById("popup");
  //   var popupText = document.getElementById("popup-text");
  //   popupText.textContent = "Task Created Successfully!";
  //   popup.style.display = "block";

    
  //   setTimeout(function() {
  //     popup.style.display = "none";
  //   }, 2000);
  // }
  alert("Task created successfully");
}


document.querySelector(".display-task").addEventListener("click", () => {
  const currDate = new Date();
  date.setFullYear(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
  renderCalendar();
});
function toggleTimeDropdown() {
  var dropdown = document.getElementById('timeDropdown');

  // If the dropdown is already visible, hide it
  if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
  } else {
      // If not, generate options and show it below the button
      generateTimeOptions();
      dropdown.style.display = 'block';
      positionDropdown();
  }
}

function generateTimeOptions() {
  var dropdown = document.getElementById('timeDropdown');
  
  // Clear the dropdown before generating new options
  dropdown.innerHTML = '';

  // Populate dropdown with time options from 12:00 am to 11:45 pm in 12-hour format
  for (let hours = 0; hours < 12; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
          let period = (hours < 12) ? 'AM' : 'PM';
          let displayHours = (hours === 0) ? 12 : (hours > 12) ? hours - 12 : hours;
          let formattedHours = (displayHours < 10) ? '0' + displayHours : displayHours;
          let formattedMinutes = (minutes === 0) ? '00' : minutes;
          let timeOption = formattedHours + ':' + formattedMinutes + ' ' + period;

          // Skip the last option if it's 11:45 PM
          if (!(hours === 11 && minutes === 45)) {
              var li = document.createElement('li');
              li.textContent = timeOption;
              dropdown.appendChild(li);
          }
      }
  }
}

function positionDropdown() {
  var button = document.querySelector('.adding-time');
  var dropdown = document.getElementById('timeDropdown');

  // Get the position of the button
  var rect = button.getBoundingClientRect();

  // Set the dropdown position below the button
  dropdown.style.left = rect.left + 'px';
  dropdown.style.top = rect.bottom + 'px';
}

function selectTime(event) {
  var selectedTime = event.target.textContent;
  document.querySelector('.adding-time').textContent = selectedTime;
  document.getElementById('timeDropdown').style.display = 'none';
}




document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromLocalStorage();
});

function loadTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    addTask(task);
  });
}

// let movies =[];
// const addmovie = (ev) =>{
//   ev.preventDefault();
//   let movie ={
//     id:Date.now(),
//     title: document.querySelector(".title-text").value
//   }
//   movies.push(movie);
//   console.warn('added',{movies} );
//   let pre = document.querySelector('#msg pre');
//   pre.textContent = '\n' + JSON.stringify(movies, '\t',2);
//   localStorage.setItem("my",JSON.stringify(movies));
// }
//   // document.forms[0].reset();
//   document.addEventListener('DOMContentLoaded',()=>{
//     document.querySelector('.add-task').addEventListener('click',addmovie);
//   });

renderCalendar();