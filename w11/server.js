const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static("public"));

const users = [];

// Register
app.post("/register", (req, res) => {
  const { name, email, password, mobile, dob, city, address } = req.body;

  if (!email || !password) return res.status(400).json({ msg: "Required" });

  if (users.find((u) => u.email === email))
    return res.status(409).json({ msg: "Exists" });

  users.push({ name, email, password, mobile, dob, city, address });
  res.status(201).json({ msg: "Registered" });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ msg: "Invalid" });

  res.json({ msg: "Success" });
});

// Get users
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/", (req, res) => {
  res.redirect("/login.html");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
