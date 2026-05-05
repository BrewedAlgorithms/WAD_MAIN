const express = require('express');
const userRoutes = require('./routes/userRoutes');

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/music")


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(userRoutes);

app.get("/", (req, res) => {
    res.send("Hello");
});


app.listen(3000);