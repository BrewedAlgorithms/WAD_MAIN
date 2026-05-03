const express = require("express");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const tasks = [];
let nextId = 1;

/* GET TASKS */

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

/* ADD TASK */

app.post("/addTask", (req, res) => {
  tasks.push({
    _id: String(nextId++),
    text: req.body.task,
  });

  res.json({
    message: "Task Added",
  });
});

/* UPDATE TASK */

app.put("/updateTask/:id", (req, res) => {
  const task = tasks.find((t) => t._id === req.params.id);

  if (task) {
    task.text = req.body.task;

    return res.json({
      message: "Task Updated",
    });
  }

  res.status(404).json({
    message: "Task not found",
  });
});

/* DELETE TASK */

app.delete("/deleteTask/:id", (req, res) => {
  const index = tasks.findIndex((t) => t._id === req.params.id);

  if (index !== -1) {
    tasks.splice(index, 1);

    return res.json({
      message: "Task Deleted",
    });
  }

  res.status(404).json({
    message: "Task not found",
  });
});

/* START SERVER */

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
