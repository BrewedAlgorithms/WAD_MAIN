const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory storage (resets when server restarts)
const users = [];

app.post("/register", (req, res) => {

    const user = req.body;

    if (!user || !user.email || !user.password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    const exists = users.find(u => u.email === user.email);

    if (exists) {
        return res.status(409).json({ message: "User already exists" });
    }

    users.push(user);

    res.status(201).json({ message: "Registered" });
});

app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid login" });
    }

    res.json({ message: "Login success" });
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.listen(3001, () => {
    console.log("Server running: http://localhost:3001");
});
