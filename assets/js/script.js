const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const pageContentEl = document.querySelector("#page-content");
let taskIdCounter = 0;



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
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    const taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    const taskAsctionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskAsctionsEl);

    tasksToDoEl.appendChild(listItemEl);

    //increase the task counter for the next unique id
    taskIdCounter++;
};

const createTaskActions = (taskId) => {
    const actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions"; 
    // create edit button
    const editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create a delete button
    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    const statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    const statusChoices = ["To Do", "In Progress", "Completed"];
    for (let i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionsEl = document.createElement("option");
        statusOptionsEl.textContent = statusChoices[i];
        statusOptionsEl.setAttribute("data-task-id", taskId);
        // append to select
        statusSelectEl.appendChild(statusOptionsEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

};

const taskButtonHandler = (event) => {
    // get target element from event
    const targetEl = event.target;
    if (targetEl.matches(".delete-btn")) {
        // get the element's task id
        const taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    } else if (targetEl.matches(".edit-btn")) {
        const taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
};

const deleteTask = (taskId) => {
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

const editTask = (taskId) => {
    console.log("editing task #" + taskId);
    // get task list item element
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //get content from task name and type
    const taskName = taskSelected.querySelector("h3.task-name").textContent;
    const taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);

