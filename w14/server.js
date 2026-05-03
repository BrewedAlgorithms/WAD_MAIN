const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.use(express.static("public"));

const usersPath = "users.json";

app.get("/api/users", (req, res) => {
  try {
    const data = fs.readFileSync(usersPath, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Failed to read data" });
  }
});


app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
