const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static("public"));
app.use("/images", express.static("images"));

// API Route
app.get("/employees", (req, res) => {
  try {
    const data = fs.readFileSync("employees.json", "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).send("Error reading file");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
