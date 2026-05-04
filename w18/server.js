const express = require("express");
const connectDB = require("./config/db");
const songRoutes = require("./routes/songRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/", songRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
