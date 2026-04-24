const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// INSERT
router.get("/insert", async (req, res) => {
  await Student.insertMany([
    {
      Name: "A",
      Roll_No: 1,
      WAD_Marks: 25,
      CC_Marks: 30,
      DSBDA_Marks: 22,
      CNS_Marks: 28,
      AI_Marks: 26,
    },
    {
      Name: "B",
      Roll_No: 2,
      WAD_Marks: 10,
      CC_Marks: 15,
      DSBDA_Marks: 18,
      CNS_Marks: 20,
      AI_Marks: 12,
    },
    {
      Name: "C",
      Roll_No: 3,
      WAD_Marks: 35,
      CC_Marks: 32,
      DSBDA_Marks: 27,
      CNS_Marks: 30,
      AI_Marks: 29,
    },
  ]);
  res.send("Inserted");
});

// ALL DATA
router.get("/all", async (req, res) => {
  const data = await Student.find();
  const count = await Student.countDocuments();
  res.send({ count, data });
});

// DSBDA > 20
router.get("/dsbda", async (req, res) => {
  const data = await Student.find({ DSBDA_Marks: { $gt: 20 } }, "Name");
  res.send(data);
});

// UPDATE
router.get("/update/:name", async (req, res) => {
  await Student.updateOne(
    { Name: req.params.name },
    {
      $inc: {
        WAD_Marks: 10,
        CC_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        AI_Marks: 10,
      },
    },
  );
  res.send("Updated");
});

// ABOVE 25
router.get("/above25", async (req, res) => {
  const data = await Student.find(
    {
      WAD_Marks: { $gt: 25 },
      CC_Marks: { $gt: 25 },
      DSBDA_Marks: { $gt: 25 },
      CNS_Marks: { $gt: 25 },
      AI_Marks: { $gt: 25 },
    },
    "Name",
  );

  res.send(data);
});

// LESS THAN 40
router.get("/less40", async (req, res) => {
  const data = await Student.find(
    {
      CNS_Marks: { $lt: 40 },
      DSBDA_Marks: { $lt: 40 },
    },
    "Name",
  );

  res.send(data);
});

// DELETE
router.get("/delete/:name", async (req, res) => {
  await Student.deleteOne({ Name: req.params.name });
  res.send("Deleted");
});

// TABLE VIEW
router.get("/table", async (req, res) => {
  const data = await Student.find();

  let table = `<table border="1">
    <tr><th>Name</th><th>Roll</th><th>WAD</th><th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th></tr>`;

  data.forEach((s) => {
    table += `<tr>
        <td>${s.Name}</td>
        <td>${s.Roll_No}</td>
        <td>${s.WAD_Marks}</td>
        <td>${s.DSBDA_Marks}</td>
        <td>${s.CNS_Marks}</td>
        <td>${s.CC_Marks}</td>
        <td>${s.AI_Marks}</td>
        </tr>`;
  });

  table += "</table>";
  res.send(table);
});

module.exports = router;
