let tasks = [];
let selectedTaskId = null;
let deleteTaskId;
let darkMode = false;

// Toggle Dark and Light Mode
function toggleDarkMode() {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.add("dark-mode");
    document.getElementById("toggleIcon").innerText = "🌞";
  } else {
    document.body.classList.remove("dark-mode");
    document.getElementById("toggleIcon").innerText = "🌙";
  }
}

document
  .getElementById("toggleSwitch")
  .addEventListener("change", toggleDarkMode);

// Adding Tasks
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const priorityInput = document.getElementById("priorityInput");
  const taskText = taskInput.value.trim();
  const priority = priorityInput.value;
  const createdAt = new Date().toLocaleString();

  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: createdAt,
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = "";
  }
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const completedTasksDiv = document.getElementById("completedTasks");
  taskList.innerHTML = "";
  completedTasksDiv.innerHTML = "";

  tasks.forEach((task) => {
    const taskCard = document.createElement("div");

    const btnGroup = `
          <div class="btn-group mt-2 float-end">
            ${
              task.completed
                ? ""
                : `<button onclick="openConfirmationModal(${task.id})" class="btn btn-outline-success rounded-pill btn-sm">✅</button>`
            }
            <button onclick="confirmTaskDelete(${
              task.id
            })" class="btn btn-outline-danger rounded-pill btn-sm ms-3">✖</button>
          </div>
        `;

    taskCard.innerHTML = `
          <div class="card p-3 mb-2">
            <span class="${task.completed ? "completed-task" : ""}">${
      task.text
    }</span>
            <p class="mt-1 small text-muted">Created: ${task.createdAt}</p>
            ${btnGroup}
          </div>
        `;

    if (task.completed) {
      completedTasksDiv.appendChild(taskCard);
    } else {
      taskList.appendChild(taskCard);
    }
  });
}

function openConfirmationModal(taskId) {
  selectedTaskId = taskId;
  const modal = new bootstrap.Modal(
    document.getElementById("confirmationModal")
  );
  modal.show();
}

function confirmToggleTask() {
  const task = tasks.find((t) => t.id === selectedTaskId);
  if (task) {
    task.completed = true;
    renderTasks();
  }
  const modalEl = document.getElementById("confirmationModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
}

function confirmTaskDelete(id) {
  deleteTaskId = id;
  const modal = new bootstrap.Modal("#deleteModal");
  modal.show();

  modal._element.querySelector(".btn-danger").addEventListener("click", () => {
    modal.hide();
    tasks = tasks.filter((task) => task.id !== deleteTaskId);
    renderTasks();
  });
}
