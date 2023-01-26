
document.getElementById("submitNewTaskForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let name = document.querySelector("#task-name").value;
  let description = document.querySelector("#task-description").value;
  let assignedTo = document.querySelector("#assigned-user").value;
  let dueDate = document.querySelector("#due-date").value;


  if (name.length === 0 || description.length === 0 || assignedTo.length === 0 || dueDate.length === 0) {
    let myAlert = document.getElementById('alert');
    myAlert.style.display = 'block';
  } else {
    let myAlert = document.getElementById('alert');
    myAlert.style.display = 'none';
    newTask.addTask();
    newTask.render();
    newTask.save();
  }
});

let tasksList = document.querySelector("#taskList");

tasksList.addEventListener('click', (event) => {
  if (event.target.classList.contains('complete-button')) {
    const parentTask = event.target.closest(".card");
    const taskId = Number(parentTask.dataset.taskId);
    const task = newTask.getTaskById(taskId);
    task.status = 'Complete';
    newTask.render();
  }

  if (event.target.classList.contains('edit-button')) {
    const parentTask = event.target.closest(".card");
    const taskId = Number(parentTask.dataset.taskId);
    const task = newTask.getTaskById(taskId);
    task.name = prompt('New Task Name:');
    task.description = prompt('New Task Description:');
    task.dueDate = prompt('New Task Due Date (mm/dd/yyyy):');
    task.assignedTo = prompt('New Task Assigned To:');
  newTask.render();
  }

  if (event.target.classList.contains('delete-button')) {
    const parentTask = event.target.closest(".card");
    const taskId = Number(parentTask.dataset.taskId);
    newTask.deleteTask(taskId);
    newTask.save();
    newTask.render();
  }
});