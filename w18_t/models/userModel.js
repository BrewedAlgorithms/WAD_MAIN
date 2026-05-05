const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    uname: String,
    uemail: String,
    upass: String
});

module.exports = mongoose.model("user", userModel);