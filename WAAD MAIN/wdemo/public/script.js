const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

document.addEventListener("DOMContentLoaded", fetchTasks);

function fetchTasks() {

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "/tasks", true);

    xhr.onload = function () {

        if (xhr.status === 200) {

            const tasks = JSON.parse(xhr.responseText);
            let html = "";

            for (let i = 0; i < tasks.length; i++) {

                html += `
                    <li>
                        <span>${tasks[i].text}</span>
                        <div class="btns">
                            <button onclick="updateTask('${tasks[i]._id}','${tasks[i].text}')">
                                Update
                            </button>
                            <button onclick="deleteTask('${tasks[i]._id}')">
                                Delete
                            </button>
                        </div>
                    </li>
                `;
            }

            taskList.innerHTML = html;
        }
    };

    xhr.send();
}

function addTask() {

    if (!taskInput.value.trim()) return alert("Enter task");

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/addTask", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {

        if (xhr.status === 200) {
            taskInput.value = "";
            fetchTasks();
        }
    };

    xhr.send(JSON.stringify({
        task: taskInput.value
    }));
}

function updateTask(id, oldTask) {

    const updatedTask = prompt("Update Task", oldTask);

    if (!updatedTask) return;

    const xhr = new XMLHttpRequest();

    xhr.open("PUT", "/updateTask/" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {

        if (xhr.status === 200) {
            fetchTasks();
        }
    };

    xhr.send(JSON.stringify({
        task: updatedTask
    }));
}

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