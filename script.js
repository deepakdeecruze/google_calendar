let date = new Date();
let tasks = [];
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

  for (let x = firstDayIndex; x > 0; x--) {
    days.push(`<div class="prev-date">${prevLastDay - x + 1}</div>`);
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      dateInput.getMonth() === new Date().getMonth() &&
      dateInput.getFullYear() === new Date().getFullYear()
    ) {
      days.push(`<div class="today">${i}</div>`);
    } else {
      days.push(`<div class="date">${i}</div>`);
    }
  }

  for (let j = 1; j <= nextDay; j++) {
    days.push(`<div class="next-date">${j}</div>`);
  }

  let extraDays = [];
  if (days !== 6) {
    for (let j = nextDay+1; j <= nextDay+7; j++) {
      extraDays.push(`<div class="next-date">${j}</div>`);
    }
  }
  return [days, extraDays];
};

const renderCalendar = () => {
  const monthDays = document.querySelector(".calendar");
  document.querySelector(".date p").innerHTML = months[date.getMonth()] + " " + date.getFullYear();

  let [days, extraDays] = getDates(date);
  document.querySelector(".calendar").style.gridTemplateRows = `repeat(${days.length/7}, 1fr)`;
  let daysElement = "";

  for (let i = 0; i < 7; i++) {
    daysElement += `<div class="date-box">${daysOfWeek[i] + days[i]}</div>`;
  }

  for (let i = 7; i < days.length; i++) {
    daysElement += `<div class="date-box">${days[i]}</div>`;
  }

  monthDays.innerHTML = daysElement;
  miniDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  renderMiniCalendar();
  renderminiminiCalendar();
}

const renderMiniCalendar = () => {
  const monthDays = document.querySelector(".mini-calendar");
  document.querySelector(".curr-date").innerHTML = months[miniDate.getMonth()] + " " + miniDate.getFullYear();

  let [days, extraDays] = getDates(miniDate);
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
// 
// const renderminiminiCalendar = () => {
//   const monthDays = document.querySelector(".minimini-calendar");
//   document.querySelector(".currr-date").innerHTML = months[miniminiDate.getMonth()] + " " + miniminiDate.getFullYear();

//   let [days, extraDays] = getDates(miniminiDate);
//   if (days.length/7 !== 6) {
//     days = days.concat(extraDays);
//   };

//   let daysElement =  `
//       <div class="weekdays">S</div>
//       <div class="weekdays">M</div>
//       <div class="weekdays">T</div>
//       <div class="weekdays">W</div>
//       <div class="weekdays">T</div>
//       <div class="weekdays">F</div>
//       <div class="weekdays">S</div>
//   `;
//   for (let i = 0; i < days.length; i++) {
//     daysElement += days[i];
//   }
//   monthDays.innerHTML = daysElement;
// }

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

// document.querySelector(".minimini-left").addEventListener("click", () => {
//   miniminiDate.setMonth(miniminiDate.getMonth() - 1);
//   renderminiminiCalendar();
// });

// document.querySelector(".minimini-right").addEventListener("click", () => {
//   miniminiDate.setMonth(miniminiDate.getMonth() + 1);
//   renderminiminiCalendar();
// });


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

renderCalendar();



// Function to render tasks on the UI
function renderTasks() {
  // Implement code to display tasks on the UI
  console.log("Tasks:", tasks);
}

// ... (Your existing JavaScript code) ...
document.getElementById("showTaskPopup").addEventListener("click", () => {
  showTaskPopup();
});

// Function to close the task creation popup
function closeTaskPopup() {
  document.getElementById("taskPopup").style.display = "none";
}

// Event listener for the save task button
document.getElementById("saveTask").addEventListener("click", () => {
  saveTask();
});

// Function to create and save a task
function saveTask() {
  const title = document.getElementById("taskTitle").value;
  // const date = document.getElementById("taskDate").value;
  const description = document.getElementById("taskDescription").value;

  // if (title && date && description) {
  //   createTask(title, date, description);
  //   closeTaskPopup();
  // } else {
  //   alert("Please fill in all task details.");
  // }
}


// Function to create and save a task
function createTask(title, date, description) {
  // Here, you can store the task details or perform any other logic.
  // For now, let's just log the task details.
  const task = {
    title: title,
    date: date,
    description: description,
  };

  console.log("New Task:", task);
  tasks.push(task); // Fix the typo here
  renderTasks();
  saveTasksToLocalStorage();
}

// Function to show the task creation popup
function showTaskPopup() {
  const taskPopup = document.getElementById("taskPopup");
  taskPopup.style.display = "flex";
}


function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
}

// Call this function to load tasks when the page/script starts
loadTasksFromLocalStorage();

// document.getElementById("showmimicalendar").addEventListener("click", () => {
//   showmimicalendar();
// });
// function showmimicalendar() {
//   const miniminiheader = document.getElementById("miniminiheader");
//   miniminiheader.style.display = "flex"; }
// 

function myFunction() {
  const x = document.createElement("INPUT");
  x.setAttribute("type", "date");
  x.setAttribute("value", "2014-02-09");
  document.body.appendChild(x);
}