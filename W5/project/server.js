const express = require("express");
const mongoose = require("mongoose");

const app = express();

// CONNECT DB (music database)
mongoose
  .connect("mongodb://127.0.0.1:27017/music")
  .then(() => console.log("DB Connected"));

// ROUTES
const songRoutes = require("./routes/songRoutes");
app.use("/", songRoutes);

// SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});


// npm init -y
// npm install express mongoose