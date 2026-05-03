const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.use("/", require("./routes/songRoutes"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});