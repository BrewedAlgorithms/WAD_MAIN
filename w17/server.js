const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static("public"));
app.use("/images", express.static("images"));

// API Route
app.get("/employees", (req, res) => {

    fs.readFile("employees.json", "utf-8", (err, data) => {

        if (err) {
            return res.status(500).send("Error reading file");
        }

        const employees = JSON.parse(data);

        res.json(employees);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});