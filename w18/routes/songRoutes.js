const express = require("express");
const router = express.Router();
const Song = require("../models/songModel");


// c) Insert 5 songs
router.get("/insert", async (req, res) => {
    await Song.insertMany([
        { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", Singer: "Arijit Singh" },
        { Songname: "Kesariya", Film: "Brahmastra", Music_director: "Pritam", Singer: "Arijit Singh" },
        { Songname: "Kal Ho Na Ho", Film: "KHNH", Music_director: "Shankar", Singer: "Sonu Nigam" },
        { Songname: "Chaiyya Chaiyya", Film: "Dil Se", Music_director: "A R Rahman", Singer: "Sukhwinder Singh" },
        { Songname: "Senorita", Film: "ZNMD", Music_director: "Shankar", Singer: "Farhan Akhtar" }
    ]);
    res.json({ message: "Songs Inserted" });
});


// d) Count + display all
router.get("/all", async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    res.json({ count, data: songs });
});


// e) Songs by Music Director
router.get("/director/:name", async (req, res) => {
    const data = await Song.find({ Music_director: req.params.name });
    res.json({ count: data.length, data });
});


// f) Songs by Director AND Singer
router.get("/director-singer/:director/:singer", async (req, res) => {
    const data = await Song.find({
        Music_director: req.params.director,
        Singer: req.params.singer
    });
    res.json({ count: data.length, data });
});


// g) Delete song
router.get("/delete/:name", async (req, res) => {
    await Song.deleteOne({ Songname: req.params.name });
    res.json({ message: `Song Deleted: ${req.params.name}` });
});


// h) Add new song
router.get("/add", async (req, res) => {
    const song = new Song({
        Songname: "Apna Bana Le",
        Film: "Bhediya",
        Music_director: "Sachin-Jigar",
        Singer: "Arijit Singh"
    });

    await song.save();
    res.json({ message: "New Song Added" });
});


// i) Songs by Singer from specific film
router.get("/filter/:singer/:film", async (req, res) => {
    const data = await Song.find({
        Singer: req.params.singer,
        Film: req.params.film
    });
    res.json({ count: data.length, data });
});


// j) Update Actor & Actress
router.get("/update/:name", async (req, res) => {
    await Song.updateOne(
        { Songname: req.params.name },
        {
            $set: {
                Actor: "Ranbir Kapoor",
                Actress: "Alia Bhatt"
            }
        }
    );
    res.json({ message: `Updated Actor & Actress for ${req.params.name}` });
});


// k) Display in Table
router.get("/table", async (req, res) => {
    const songs = await Song.find();
    let rowNo = 1;

    let html = `
    <h2>Song Details</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
        <tr>
            <th>Sr</th><th>Song</th><th>Film</th><th>Director</th><th>Singer</th><th>Actor</th><th>Actress</th>
        </tr>
    `;

    songs.forEach(s => {
        html += `
        <tr>
            <td>${rowNo++}</td>
            <td>${s.Songname}</td>
            <td>${s.Film}</td>
            <td>${s.Music_director}</td>
            <td>${s.Singer}</td>
            <td>${s.Actor || "-"}</td>
            <td>${s.Actress || "-"}</td>
        </tr>
        `;
    });

    html += "</table>";
    res.send(html);
});

module.exports = router;