const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("public"));

const users = [];

/* GET USERS */

app.get("/users", (req, res) => res.json(users));

/* REGISTER */

app.post("/register", (req, res) => {
  const { name, email, password, mobile, dob, city, address } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  users.push({ name, email, password, mobile, dob, city, address });

  res.status(201).end();
});

/* LOGIN */

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({
      message: "Invalid login",
    });
  }

  res.json({
    message: "Login success",
  });
});

/* START SERVER */
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

app.listen(3001, () => console.log("Server running: http://localhost:3001"));
