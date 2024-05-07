let input = document.querySelector(".input-text");
let submit = document.querySelector(".submit");
let divtask = document.querySelector(".divtask");

let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addtaskstoarray(input.value);
    input.value = "";
  }
};

divtask.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    removeFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("test")) {
    e.target.classList.toggle("done");
  }
  updatetaskstatus(e.target.getAttribute("data-id"));
});

function addtaskstoarray(tasktext) {
  const task = {
    id: Date.now(),
    title: tasktext,
    completed: false,
  };
  arrayOfTasks.push(task);
  // function add tasks to page
  addtasksfromArrayToPage(arrayOfTasks);
}
function addtasksfromArrayToPage(tasks) {
  //looping on the array and add each task inside a new div
  divtask.innerHTML = "";
  tasks.forEach(function (task) {
    let div = document.createElement("div");
    div.className = "test";
    if (task.completed === true) {
      div.className = "test done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    // add delete button
    let span = document.createElement("span");
    span.appendChild(document.createTextNode("delete"));
    span.setAttribute("class", "delete");
    div.appendChild(span);
    divtask.appendChild(div);

    addtoLocalStorageFrom(arrayOfTasks);
  });
}
function addtoLocalStorageFrom() {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addtasksfromArrayToPage(tasks);
  }
}
function removeFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter(function (e) {
    return e.id != taskId;
  });
  addtoLocalStorageFrom(arrayOfTasks);
}
function updatetaskstatus(divId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == divId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addtoLocalStorageFrom(arrayOfTasks);
}
