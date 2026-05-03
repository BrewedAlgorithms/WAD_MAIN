const express = require("express");
const mongoose = require("mongoose");

const app = express();

/* MongoDB Connection */

mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* Schema */

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    genre: String
});

const Book = mongoose.model("Book", bookSchema);

/* ADD BOOK */

app.get("/add", async (req, res) => {

    const book = new Book({
        title: "Harry Potter",
        author: "J.K Rowling",
        price: 500,
        genre: "Fantasy"
    });

    await book.save();

    res.send("Book Added");
});

/* VIEW ALL BOOKS */

app.get("/books", async (req, res) => {

    const books = await Book.find();

    res.send(books);
});

/* UPDATE BOOK */

app.get("/update", async (req, res) => {

    await Book.updateOne(
        { title: "Harry Potter" },
        { price: 700 }
    );

    res.send("Book Updated");
});

/* DELETE BOOK */

app.get("/delete", async (req, res) => {

    await Book.deleteOne({ title: "Harry Potter" });

    res.send("Book Deleted");
});

/* START SERVER */

app.listen(3000, () => {
    console.log("Server Running");
});