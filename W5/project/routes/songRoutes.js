const express = require("express");
const router = express.Router();
const Song = require("../models/song");

// c) INSERT 5 SONGS
router.get("/insert", async (req, res) => {
  await Song.insertMany([
    {
      Songname: "Song1",
      Film: "Film1",
      Music_director: "MD1",
      Singer: "Singer1",
    },
    {
      Songname: "Song2",
      Film: "Film2",
      Music_director: "MD2",
      Singer: "Singer2",
    },
    {
      Songname: "Song3",
      Film: "Film1",
      Music_director: "MD1",
      Singer: "Singer2",
    },
    {
      Songname: "Song4",
      Film: "Film3",
      Music_director: "MD3",
      Singer: "Singer1",
    },
    {
      Songname: "Song5",
      Film: "Film2",
      Music_director: "MD2",
      Singer: "Singer3",
    },
  ]);
  res.send("Inserted");
});

// d) COUNT + ALL
router.get("/all", async (req, res) => {
  const data = await Song.find();
  const count = await Song.countDocuments();
  res.send({ count, data });
});

// e) SONGS BY MUSIC DIRECTOR
router.get("/director/:name", async (req, res) => {
  const data = await Song.find({ Music_director: req.params.name });
  res.send(data);
});

// f) SONGS BY DIRECTOR + SINGER
router.get("/director-singer/:director/:singer", async (req, res) => {
  const data = await Song.find({
    Music_director: req.params.director,
    Singer: req.params.singer,
  });
  res.send(data);
});

// g) DELETE SONG
router.get("/delete/:song", async (req, res) => {
  await Song.deleteOne({ Songname: req.params.song });
  res.send("Deleted");
});

// h) ADD NEW SONG
router.get("/add", async (req, res) => {
  await Song.create({
    Songname: "Favorite",
    Film: "FavFilm",
    Music_director: "FavMD",
    Singer: "FavSinger",
  });
  res.send("Added");
});

// i) SONG BY SINGER + FILM
router.get("/singer-film/:singer/:film", async (req, res) => {
  const data = await Song.find({
    Singer: req.params.singer,
    Film: req.params.film,
  });
  res.send(data);
});

// j) UPDATE ADD ACTOR + ACTRESS
router.get("/update/:song", async (req, res) => {
  await Song.updateOne(
    { Songname: req.params.song },
    { $set: { Actor: "Actor1", Actress: "Actress1" } },
  );
  res.send("Updated");
});

// k) TABLE FORMAT
router.get("/table", async (req, res) => {
  const data = await Song.find();

  let table = `<table border="1">
    <tr>
    <th>Song</th><th>Film</th><th>Director</th><th>Singer</th><th>Actor</th><th>Actress</th>
    </tr>`;

  data.forEach((s) => {
    table += `<tr>
        <td>${s.Songname}</td>
        <td>${s.Film}</td>
        <td>${s.Music_director}</td>
        <td>${s.Singer}</td>
        <td>${s.Actor || "-"}</td>
        <td>${s.Actress || "-"}</td>
        </tr>`;
  });

  table += "</table>";
  res.send(table);
});

module.exports = router;
