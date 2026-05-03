const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

// Insert data
router.get("/insert", async (req, res) => {
    await Student.insertMany([
        { Name: "ABC", Roll_No: 111, WAD_Marks: 25, CC_Marks: 25, DSBDA_Marks: 30, CNS_Marks: 28, AI_marks: 27 },
        { Name: "XYZ", Roll_No: 112, WAD_Marks: 15, CC_Marks: 18, DSBDA_Marks: 22, CNS_Marks: 20, AI_marks: 19 },
        { Name: "PQR", Roll_No: 113, WAD_Marks: 35, CC_Marks: 30, DSBDA_Marks: 40, CNS_Marks: 32, AI_marks: 33 }
    ]);
    res.json({ message: "Data Inserted" });
});

// d) Count + display all
router.get("/all", async (req, res) => {
    const students = await Student.find();
    const count = await Student.countDocuments();
    res.json({ count, data: students });
});

// e) DSBDA > 20
router.get("/dsbda", async (req, res) => {
    const data = await Student.find(
        { DSBDA_Marks: { $gt: 20 } },
        { Name: 1, _id: 0 }
    );
    res.json({ count: data.length, data });
});

// f) Update marks
router.get("/update/:name", async (req, res) => {
    await Student.updateOne(
        { Name: req.params.name },
        {
            $inc: {
                WAD_Marks: 10,
                CC_Marks: 10,
                DSBDA_Marks: 10,
                CNS_Marks: 10,
                AI_marks: 10
            }
        }
    );
    res.json({ message: `Updated ${req.params.name}` });
});

// g) >25 in all subjects
router.get("/above25", async (req, res) => {
    const data = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_marks: { $gt: 25 }
    }, { Name: 1, _id: 0 });

    res.json({ count: data.length, data });
});

// h) <40 in CNS & DSBDA
router.get("/less40", async (req, res) => {
    const data = await Student.find({
        CNS_Marks: { $lt: 40 },
        DSBDA_Marks: { $lt: 40 }
    }, { Name: 1, _id: 0 });

    res.json({ count: data.length, data });
});

// i) Delete student
router.get("/delete/:name", async (req, res) => {
    await Student.deleteOne({ Name: req.params.name });
    res.json({ message: `Deleted ${req.params.name}` });
});

// j) HTML Table
router.get("/table", async (req, res) => {
    const students = await Student.find();
    let rowNo = 1;

    let html = `
    <h2>Student Marks</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
        <tr>
            <th>Sr</th><th>Name</th><th>Roll</th><th>WAD</th><th>CC</th><th>DSBDA</th><th>CNS</th><th>AI</th>
        </tr>
    `;

    students.forEach(s => {
        html += `
        <tr>
            <td>${rowNo++}</td>
            <td>${s.Name}</td>
            <td>${s.Roll_No}</td>
            <td>${s.WAD_Marks}</td>
            <td>${s.CC_Marks}</td>
            <td>${s.DSBDA_Marks}</td>
            <td>${s.CNS_Marks}</td>
            <td>${s.AI_marks}</td>
        </tr>
        `;
    });

    html += "</table>";
    res.send(html);
});

module.exports = router;