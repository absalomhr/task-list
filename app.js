// Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();
function loadEventListeners(){
    // Add task event
    form.addEventListener("submit", addTask);
    // Remove task event
    taskList.addEventListener("click", removeTask);
    // Clear task event
    clearBtn.addEventListener("click", clearTasks);
    // Filter tasks
    filter.addEventListener("keyup", filterTasks);
    // DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);
}

// Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else{
        // Local storage only stores strings
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement("li");
        // Add class
        li.className = "collection-item";
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element for task deletion
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = `<i class="fa fa-remove"></i>`
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e){
    if(taskInput.value === ""){
        alert("ESCRIBE UNA TAREA");
    } else {
        // Create li element
        const li = document.createElement("li");
        // Add class
        li.className = "collection-item";
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element for task deletion
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = `<i class="fa fa-remove"></i>`
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);

        // Store in local storage
        storeTaskLS(taskInput.value);
        // Clear input
        taskInput.value = "";
        e.preventDefault();
    }
}

// Store task LS
function storeTaskLS(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else{
        // Local storage only stores strings
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("¿Estás seguro?")){
            e.target.parentElement.parentElement.remove();
            removeFromLS(e.target.parentElement.parentElement);
        }
    }
}

// Remove task from LS
function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else{
        // Local storage only stores strings
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e){
    if(taskList.firstChild){
        if(confirm("¿Estás seguro?")){
            while(taskList.firstChild){
                taskList.removeChild(taskList.firstChild);
            }
            localStorage.clear();
        }
    } else {
        alert("No hay tareas en la lista");
    }
}

// Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    if(taskList.firstChild){
        document.querySelectorAll(".collection-item").forEach(function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }
        });
    } else {
        e.target.value = "";
        alert("No hay tareas en la lista");
    }
}

