const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

document.addEventListener("DOMContentLoaded", fetchTasks);

// 📥 Get all tasks
function fetchTasks() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/tasks", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const tasks = JSON.parse(xhr.responseText);
      taskList.innerHTML = "";

      tasks.forEach((t) => {
        taskList.innerHTML += `
          <li>
            ${t.text}
            <button onclick="updateTask('${t._id}','${t.text}')">Update</button>
            <button onclick="deleteTask('${t._id}')">Delete</button>
          </li>
        `;
      });
    }
  };

  xhr.send();
}

// ➕ Add task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("Enter task");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/addTask", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      taskInput.value = "";
      fetchTasks();
    }
  };

  xhr.send(JSON.stringify({ task: text }));
}

// ✏️ Update task
function updateTask(id, oldTask) {
  const text = prompt("Update Task", oldTask);
  if (!text) return;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "/updateTask/" + id, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      fetchTasks();
    }
  };

  xhr.send(JSON.stringify({ task: text }));
}

// ❌ Delete task
function deleteTask(id) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/deleteTask/" + id, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      fetchTasks();
    }
  };

  xhr.send();
}
