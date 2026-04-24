const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DB CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/student")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB connection error:", err.message));

// ROUTES
const studentRoutes = require("./routes/studentRoutes");
app.use("/", studentRoutes);

// SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// npm init -y
// npm install express mongoose
// // net start MongoDB
