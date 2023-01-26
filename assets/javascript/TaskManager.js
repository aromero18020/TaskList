// Displays new task layout when task form is submitted
function createTaskHtml(id, name, description, assignedTo, dueDate, status) {
  const html = `
  <div class="card col-lg-12 col-md-12 col-sm-12 new-task-container" data-task-id="${id}">
  <div class="card-body center-aligned">
    <span class="badge ${status === 'In Progress' ? 'text-bg-danger' : 'text-bg-success'}">${status}</span>
    <br>
    <h5 class="card-title task-title">${name}</h5>
    <h6 class="card-subtitle mb-2 task-description">Description: ${description}</h6>
    <div class="col-12 task-details">
    <h6 class="card-subtitle mb-2 text-centered">Assigned To: ${assignedTo}</h6>
    <h6 class="card-subtitle mb-2 text-centered">Date: ${dueDate}</h6>
    </div>
  </div>
  <div class="status-buttons">
  <button type="button" class="complete-button btn btn-success ${status === 'In Progress' ? 'visible' : 'invisible'}"><i class="bi bi-check-square"></i></button>
  <button type="button" class="edit-button btn btn-primary"><i class="bi bi-pencil-square"></i></button>
  <button type="button" class="delete-button btn btn-danger"><i class="bi bi-trash3"></i></button>
  </div>
</div>
`;

  return html;
}



class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentId = 0;
  }
  
  addTask() {

    const task = {
      id: this.currentId++,
      name: document.querySelector("#task-name").value,
      description: document.querySelector("#task-description").value,
      assignedTo: document.querySelector("#assigned-user").value,
      dueDate: document.querySelector("#due-date").value,
      status: 'In Progress'
    }
    this.tasks.push(task);
  }
  

  render() {
    const tasksHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      let currentTask = this.tasks[i];
      const newDate = new Date(currentTask.dueDate);
      const formattedDate = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
      const taskHtml = createTaskHtml(currentTask.id, currentTask.name, currentTask.description, currentTask.assignedTo, formattedDate, currentTask.status);
      tasksHtmlList.push(taskHtml);
      for (let i = 0; i < tasksHtmlList.length; i++) {
        document.getElementById("taskList").innerHTML = tasksHtmlList;
      }
    }
    const tasksHtml = tasksHtmlList.join('\n');
    const tasksList = document.querySelector('#taskList');
    tasksList.innerHTML = tasksHtml;
  }

  getTaskById(taskId) {
    let foundTask = taskId;
    for (let x = 0; x < this.tasks.length; x++) {
      let task = this.tasks[x];
      if (task.id == foundTask) {
        return task;
      }
    }
  }

  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    let currentId = String(this.currentId);
    localStorage.setItem('currentId', currentId);
  }

  load() {
    if (localStorage.getItem('tasks')) {
      const tasksJson = localStorage.getItem('tasks');
      this.tasks = JSON.parse(tasksJson);
    }

    if (localStorage.getItem('currentId')) {
      const currentId = localStorage.getItem('currentId');
      this.currentId = Number(currentId);
    }
  }

  deleteTask(taskId) {
    const newTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  }
}

let newTask = new TaskManager();

newTask.load();
newTask.render();