const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// In-memory storage (resets when server restarts)
const tasks = [];
let nextId = 1;

/* ROUTES */

app.get("/tasks", async (req, res) => {

    res.json(tasks);
});

app.post("/addTask", async (req, res) => {

    const text = req.body.task;

    if (!text) {
        return res.status(400).json({ message: "Task text required" });
    }

    const task = {
        _id: String(nextId++),
        text: text
    };

    tasks.push(task);

    res.json({ message: "Task Added" });
});

app.put("/updateTask/:id", async (req, res) => {

    const id = req.params.id;
    const text = req.body.task;

    const task = tasks.find(t => t._id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.text = text;

    res.json({ message: "Task Updated" });
});

app.delete("/deleteTask/:id", async (req, res) => {

    const id = req.params.id;
    const index = tasks.findIndex(t => t._id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(index, 1);

    res.json({ message: "Task Deleted" });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () =>
    console.log("Server running on http://localhost:" + PORT)
);