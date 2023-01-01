function createTaskHtml(id, name, description, assignedTo, dueDate, status) {
  const html = `
  <div class="card col-lg-12 col-md-12 col-sm-12" data-task-id="${id}">
  <div class="card-body">
    <h5 class="card-title">Task: ${name}</h5>
    <span class="badge ${status === 'In Progress' ? 'text-bg-danger' : 'text-bg-success'}">${status}</span>
    <h6 class="card-subtitle mb-2">Assigned To: ${assignedTo}</h6>
    <h6 class="card-subtitle mb-2">Date: ${dueDate}</h6>
    <p class="card-text">Description: ${description}</p>
  </div>
  <button type="button" class="delete-button btn btn-danger" style="max-width: 10%;">Delete Task</button>
  <button type="button" class="complete-button btn btn-success ${status === 'In Progress' ? 'visible' : 'invisible'}" style="max-width: 10%;">Mark Complete</button>
</div>
`;

  return html;
}



class TaskManager {
  constructor(currentId) {
    this.tasks = [];
    this.currentId = 0;
  }

  addTask(name, description, assignedTo, dueDate) {
    var name = document.querySelector("#task-name").value;
    var description = document.querySelector("#task-description").value;
    var assignedTo = document.querySelector("#assigned-user").value;
    var dueDate = document.querySelector("#due-date").value;
    var status = 'In Progress';

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
    var tasksHtmlList = [];
    var tasksHtmlVar = tasksHtmlList;

    for (let i = 0; i < this.tasks.length; i++) {
      var currentTask = this.tasks[i];
      const newDate = new Date(currentTask.dueDate);
      // due to time zones, date is ahead by one day
      const formattedDate = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
      var taskHtml = createTaskHtml(currentTask.id, currentTask.name, currentTask.description, currentTask.assignedTo, formattedDate, currentTask.status);
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
    var foundTask = taskId;
    for (let x = 0; x < this.tasks.length; x++) {
      let task = this.tasks[x];
      if (task.id == foundTask) {
        return task;
      }
    }
  }

  save() {
    var tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    var currentId = String(this.currentId);
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
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }

    // Set this.tasks to newTasks
    this.tasks = newTasks;
  }
}


var newTaskVar = new TaskManager();

newTaskVar.load();
newTaskVar.render();