const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/bookRoutes");
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/", router);

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});