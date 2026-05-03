const express = require("express");
const mongoose = require("mongoose");

const app = express();

/* MongoDB Connection */

mongoose.connect("mongodb://127.0.0.1:27017/company")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* Schema */

const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    designation: String,
    salary: Number,
    joining_date: String
});

const Employee = mongoose.model("Employee", employeeSchema);

/* ADD EMPLOYEE */

app.get("/add", async (req, res) => {

    const emp = new Employee({
        name: "Rahul",
        department: "IT",
        designation: "Developer",
        salary: 50000,
        joining_date: "2026-04-28"
    });

    await emp.save();

    res.send("Employee Added");
});

/* VIEW ALL EMPLOYEES */

app.get("/employees", async (req, res) => {

    const employees = await Employee.find();

    res.send(employees);
});

/* UPDATE EMPLOYEE */

app.get("/update", async (req, res) => {

    await Employee.updateOne(
        { name: "Rahul" },
        { salary: 70000 }
    );

    res.send("Employee Updated");
});

/* DELETE EMPLOYEE */

app.get("/delete", async (req, res) => {

    await Employee.deleteOne({ name: "Rahul" });

    res.send("Employee Deleted");
});

/* START SERVER */

app.listen(3000, () => {
    console.log("Server Running");
});