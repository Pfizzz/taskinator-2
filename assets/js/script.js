const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");



const taskFormHandler = (event) => {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    // package up data as object
    if (!taskNameInput) {
        alert("You must enter a task, fool!");
        return false;
    }
    else if (!taskTypeInput) {
        alert("Whats the task type, hon?");
        return false;
    } else {
        const taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
        createTaskEl(taskDataObj);
        
    }
    formEl.reset();
};

const createTaskEl = (taskDataObj) => {
    const listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    const taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", taskFormHandler);


