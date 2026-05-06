# Node.js + Express + Mongoose Cheatsheet

Compiled from all practicals in this workspace (w9 - w21).

---

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Express Basics](#2-express-basics)
3. [Express Middleware](#3-express-middleware)
4. [Routing & express.Router](#4-routing--expressrouter)
5. [Mongoose Setup & Connection](#5-mongoose-setup--connection)
6. [Mongoose Schema & Model](#6-mongoose-schema--model)
7. [CRUD Operations](#7-crud-operations)
8. [MongoDB Query Operators](#8-mongodb-query-operators)
9. [Route Parameters & Query Strings](#9-route-parameters--query-strings)
10. [Sending Responses](#10-sending-responses)
11. [Static File Serving](#11-static-file-serving)
12. [Client-Side AJAX (XHR Pattern)](#12-client-side-ajax-xhr-pattern)
13. [Full Request Flow Diagram](#13-full-request-flow-diagram)
14. [Quick Reference: All Methods](#14-quick-reference-all-methods)

---

## 1. Project Setup

### Initialize and install dependencies

```bash
mkdir myproject && cd myproject
npm init -y
npm install express mongoose
```

### Resulting `package.json`

```json
{
  "name": "myproject",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "type": "commonjs",
  "dependencies": {
    "express": "^5.2.1",
    "mongoose": "^9.6.1"
  }
}
```

### Standard folder structure (used across w18-w21)

```
w21/
├── package.json
├── server.js
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   └── bookModel.js       # Mongoose schema + model
├── routes/
│   └── bookRoutes.js      # Express router with all endpoints
└── public/                # Static files (HTML/CSS/JS)
```

---

## 2. Express Basics

### Minimal server

```js
// server.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Key concepts

| Concept | Explanation |
|---------|-------------|
| `express()` | Creates an Express application instance |
| `app.listen(port, callback)` | Starts the server on given port |
| `app.METHOD(path, handler)` | Defines a route. METHOD = get, post, put, delete |
| `req` | Request object -- contains incoming data (params, query, body) |
| `res` | Response object -- used to send data back |

---

## 3. Express Middleware

Middleware functions run between the request arriving and the response being sent.

### Built-in middleware (used in every practical)

```js
// Parse JSON request bodies (req.body will be a JS object)
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public" folder
app.use(express.static("public"));
```

| Middleware | What it does | Where used |
|------------|-------------|------------|
| `express.json()` | Parses `Content-Type: application/json` bodies into `req.body` | w11, w18, w19, w20, w21 |
| `express.urlencoded({extended: true})` | Parses HTML form submissions into `req.body` | w11 |
| `express.static("public")` | Serves files from `public/` directory at root URL | w11 |

### Custom middleware example

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // MUST call next() or the request hangs
});
```

---

## 4. Routing & express.Router

Instead of putting all routes in `server.js`, use `express.Router()` to organize by resource.

### Route file pattern (from w21/bookRoutes.js)

```js
const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");

router.get("/add", async (req, res) => { ... });
router.get("/books", async (req, res) => { ... });
router.get("/update", async (req, res) => { ... });
router.get("/delete", async (req, res) => { ... });

module.exports = router;
```

### Mounting in server.js

```js
const bookRoutes = require("./routes/bookRoutes");
app.use("/", bookRoutes);
```

This means:
- `GET /add`     -> handled by bookRoutes
- `GET /books`   -> handled by bookRoutes
- `GET /update`  -> handled by bookRoutes
- `GET /delete`  -> handled by bookRoutes

If mounted as `app.use("/api", bookRoutes)`, the URLs become `/api/add`, `/api/books`, etc.

---

## 5. Mongoose Setup & Connection

### Connection file (from w19/config/db.js)

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/student");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
```

| Part | Explanation |
|------|-------------|
| `mongodb://127.0.0.1:27017/student` | MongoDB runs locally on port 27017, database name is `student` |
| `await mongoose.connect(...)` | Async connection -- returns a promise |
| `try/catch` | Catches connection failures (MongoDB not running, wrong URL, etc.) |
| `module.exports = connectDB` | Exported as a function to be called in `server.js` |

### Using it in server.js

```js
const connectDB = require("./config/db");
connectDB();  // Called once when server starts
```

---

## 6. Mongoose Schema & Model

### Schema definition (from w21/models/bookModel.js)

```js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  genre: String
});

module.exports = mongoose.model("Book", bookSchema);
```

### Key concepts

| Concept | Explanation |
|---------|-------------|
| `mongoose.Schema({...})` | Defines the shape/structure of documents in the collection |
| Schema types | `String`, `Number`, `Date`, `Boolean`, `Array`, `ObjectId` |
| `mongoose.model("Book", bookSchema)` | Creates a model. First arg = collection name (Mongoose pluralizes to `books` internally) |
| `module.exports` | Exports the model so routes can use it (`const Book = require("../models/bookModel")`) |

### Schema with more fields (from w19)

```js
const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_marks: Number
});
```

---

## 7. CRUD Operations

### CREATE -- Three ways seen across practicals

**Method 1: `new Model()` + `.save()`** (from w21/bookRoutes.js)

```js
router.get("/add", async (req, res) => {
  const book = new Book({
    title: "Harry Potter",
    author: "J.K Rowling",
    price: 500,
    genre: "Fantasy"
  });
  await book.save();
  res.send("Book Added");
});
```

**Method 2: `Model.create()`** (from w20/employeeRoutes.js)

```js
router.get("/add", async (req, res) => {
  await Employee.create({
    name: "Rahul",
    department: "IT",
    designation: "Developer",
    salary: 50000,
    joining_date: "2026-04-28"
  });
  res.send("Employee Added");
});
```

**Method 3: `Model.insertMany()`** (from w19/studentRoutes.js)

```js
router.get("/insert", async (req, res) => {
  await Student.insertMany([
    { Name: "ABC", Roll_No: 111, WAD_Marks: 25, CC_Marks: 25 },
    { Name: "XYZ", Roll_No: 112, WAD_Marks: 15, CC_Marks: 18 },
    { Name: "PQR", Roll_No: 113, WAD_Marks: 35, CC_Marks: 30 }
  ]);
  res.json({ message: "Data Inserted" });
});
```

| Method | Use when | Returns |
|--------|----------|---------|
| `new Book(data); await book.save()` | Need access to the document instance before saving | The saved document |
| `Model.create(data)` | Single document, simpler syntax | The created document |
| `Model.insertMany([...])` | Bulk insert multiple documents at once | Array of created documents |

---

### READ -- Find operations

**Find all documents**

```js
const books = await Book.find();
res.send(books);
```

**Find with filter (exact match)**

```js
// Find songs by a specific music director
const data = await Song.find({ Music_director: "Pritam" });
```

**Find with multiple conditions (AND logic)**

```js
// Both conditions must match
const data = await Song.find({
  Music_director: "Shankar",
  Singer: "Sonu Nigam"
});
```

**Find with field selection (projection)**

```js
// Return ONLY Name field, exclude _id
const data = await Student.find(
  { DSBDA_Marks: { $gt: 20 } },   // filter
  { Name: 1, _id: 0 }             // projection: 1 = include, 0 = exclude
);
```

**Count documents**

```js
const count = await Song.countDocuments();
```

**Find + Count combined**

```js
router.get("/all", async (req, res) => {
  const songs = await Song.find();
  const count = await Song.countDocuments();
  res.json({ count, data: songs });
});
```

---

### UPDATE -- Update operations

**Using `$set` (replace field values)**

```js
await Song.updateOne(
  { Songname: "Tum Hi Ho" },         // filter: which document
  { $set: { Actor: "Ranbir Kapoor", Actress: "Alia Bhatt" } }  // update
);
```

**Using `$inc` (increment numeric fields)**

```js
await Student.updateOne(
  { Name: "ABC" },
  {
    $inc: {
      WAD_Marks: 10,
      CC_Marks: 10,
      DSBDA_Marks: 10
    }
  }
);
```

**Direct replacement (without operator)**

```js
// From w20 -- this works but is a shorthand for $set in newer Mongoose
await Employee.updateOne(
  { name: "Rahul" },
  { salary: 70000 }
);
```

| Operator | What it does |
|----------|-------------|
| `$set` | Sets/replaces the specified field(s) |
| `$inc` | Increments the specified field(s) by given value (can be negative for decrement) |

---

### DELETE -- Delete operations

```js
await Book.deleteOne({ title: "Harry Potter" });
res.send("Book Deleted");
```

```js
await Student.deleteOne({ Name: req.params.name });
res.json({ message: `Deleted ${req.params.name}` });
```

| Method | What it does |
|--------|-------------|
| `Model.deleteOne(filter)` | Deletes the first matching document |
| `Model.deleteMany(filter)` | Deletes all matching documents |

---

## 8. MongoDB Query Operators

### Comparison operators (from w19/studentRoutes.js)

| Operator | Meaning | Example |
|----------|---------|---------|
| `$gt` | Greater than | `{ DSBDA_Marks: { $gt: 20 } }` |
| `$lt` | Less than | `{ CNS_Marks: { $lt: 40 } }` |
| `$gte` | Greater than or equal | `{ salary: { $gte: 50000 } }` |
| `$lte` | Less than or equal | `{ price: { $lte: 1000 } }` |
| `$eq` | Equal | `{ genre: { $eq: "Fantasy" } }` |
| `$ne` | Not equal | `{ genre: { $ne: "Horror" } }` |

### Multiple conditions in one query

**AND (implicit -- just list them)**

```js
// Both conditions must be true
Student.find({
  WAD_Marks: { $gt: 25 },
  CC_Marks: { $gt: 25 },
  DSBDA_Marks: { $gt: 25 }
});
```

---

## 9. Route Parameters & Query Strings

### Route parameters (used everywhere)

```js
// w19/studentRoutes.js
router.get("/update/:name", async (req, res) => {
  const name = req.params.name;   // e.g., /update/ABC  =>  name = "ABC"
  await Student.updateOne({ Name: name }, { ... });
  res.json({ message: `Updated ${name}` });
});
```

```js
// w18/songRoutes.js -- multiple params
router.get("/director-singer/:director/:singer", async (req, res) => {
  const data = await Song.find({
    Music_director: req.params.director,
    Singer: req.params.singer
  });
  res.json({ count: data.length, data });
});
```

| Pattern | URL Example | `req.params` |
|---------|-------------|-------------|
| `/update/:name` | `/update/ABC` | `{ name: "ABC" }` |
| `/director/:name` | `/director/Pritam` | `{ name: "Pritam" }` |
| `/director-singer/:director/:singer` | `/director-singer/Shankar/Sonu` | `{ director: "Shankar", singer: "Sonu" }` |

---

## 10. Sending Responses

| Method | Content-Type | Use when |
|--------|-------------|----------|
| `res.json(data)` | `application/json` | Sending JSON (objects, arrays) |
| `res.send(string)` | `text/html` or `text/plain` | Sending HTML or plain text |
| `res.status(code).json(data)` | `application/json` | Sending JSON with specific HTTP status |
| `res.status(code).end()` | none | Sending empty response with status |
| `res.redirect(url)` | redirect | Redirecting to another URL |

### Status codes used in the codebase

| Code | Meaning | Example |
|------|---------|---------|
| `200` | OK (default) | Successful login response |
| `201` | Created | `res.status(201).end()` after registration |
| `400` | Bad Request | Missing email/password in login |
| `401` | Unauthorized | Invalid login credentials |
| `404` | Not Found | Route not found (Express default) |
| `409` | Conflict | User already exists (duplicate registration) |

### Response patterns from the codebase

```js
// JSON response with data
res.json({ count, data: students });

// JSON response with message
res.json({ message: "Login success" });

// Status + JSON
res.status(401).json({ message: "Invalid login" });

// Status only (no body)
res.status(201).end();

// Plain text / HTML
res.send("Employee Added");
res.send(htmlTableString);

// Redirect
app.get("/", (req, res) => {
  res.redirect("/login.html");
});
```

---

## 11. Static File Serving

```js
app.use(express.static("public"));
```

Maps the `public/` folder to the root URL:

| File on disk | URL to access |
|-------------|---------------|
| `public/login.html` | `http://localhost:3000/login.html` |
| `public/style.css` | `http://localhost:3000/style.css` |
| `public/login.js` | `http://localhost:3000/login.js` |

---

## 12. Client-Side AJAX (XHR Pattern)

All frontends in the workspace use `XMLHttpRequest` (not `fetch`).

### POST request (from w11/login.js)

```js
const xhr = new XMLHttpRequest();
xhr.open("POST", "/login", true);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onload = function () {
  if (xhr.status === 200) {
    window.location.href = "data.html";       // Success: redirect
  } else {
    alert("Invalid Login");                    // Failure: alert
  }
};

xhr.onerror = function () {
  alert("Server not running (start server.js)");  // Network failure
};

xhr.send(JSON.stringify({ email, password }));
```

### GET request (from w11/data.js)

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/users", true);

xhr.onload = function () {
  if (xhr.status === 200) {
    const users = JSON.parse(xhr.responseText);   // Parse JSON string to array
    users.forEach(u => {
      table.innerHTML += `<tr><td>${u.name}</td>...</tr>`;
    });
  }
};

xhr.onerror = function () {
  table.innerHTML = "<tr><td>Server not running</td></tr>";
};

xhr.send();  // No body for GET
```

### XHR method comparison

| Aspect | GET | POST |
|--------|-----|------|
| `xhr.open()` | `xhr.open("GET", "/users", true)` | `xhr.open("POST", "/register", true)` |
| Header | Not needed | `xhr.setRequestHeader("Content-Type", "application/json")` |
| Body | `xhr.send()` (empty) | `xhr.send(JSON.stringify(data))` |
| Response | `JSON.parse(xhr.responseText)` | Check status code (201 = created, 409 = conflict) |

---

## 13. Full Request Flow Diagram

### Registration flow (w11 example)

```
Browser                        Server (Express)                     MongoDB
   |                                |                                  |
   |  POST /register                |                                  |
   |  {name, email, password, ...}  |                                  |
   |------------------------------>|                                  |
   |                                |  req.body = parsed JSON          |
   |                                |  express.json() middleware       |
   |                                |                                  |
   |                                |  Check: email exists?            |
   |                                |  users.find(u => u.email === email)
   |                                |                                  |
   |  409 {message: "exists"}       |                                  |
   |<------------------------------|                                  |
   |   (or)                         |                                  |
   |                                |  Push to array / save to DB      |
   |  201 (Created)                 |                                  |
   |<------------------------------|                                  |
   |                                |                                  |
   |  alert("User already exists")  |                                  |
   |   or                           |                                  |
   |  Show "Registration Successful"|                                  |
   |                                |                                  |
```

### Login flow

```
Browser                        Server (Express)
   |                                |
   |  POST /login                   |
   |  {email, password}             |
   |------------------------------>|
   |                                |  Find matching user
   |                                |  users.find(u => u.email === email
   |                                |               && u.password === password)
   |                                |
   |  401 {message: "Invalid"}      |
   |<------------------------------|  (no match)
   |   (or)                         |
   |  200 {message: "Login success"}|
   |<------------------------------|  (match found)
   |                                |
   |  alert("Invalid Login")        |
   |   or                           |
   |  Redirect to data.html         |
   |                                |
```

---

## 14. Quick Reference: All Methods

### Express

| Method | Syntax | Example |
|--------|--------|---------|
| Create app | `const app = express()` | `const app = express()` |
| GET route | `app.get(path, handler)` | `app.get("/users", (req, res) => res.json(users))` |
| POST route | `app.post(path, handler)` | `app.post("/login", (req, res) => { ... })` |
| Use middleware | `app.use(middleware)` | `app.use(express.json())` |
| Serve static | `app.use(express.static(dir))` | `app.use(express.static("public"))` |
| Listen | `app.listen(port, cb)` | `app.listen(3000, () => console.log("running"))` |
| Create router | `express.Router()` | `const router = express.Router()` |
| Mount router | `app.use(prefix, router)` | `app.use("/", bookRoutes)` |

### Mongoose

| Method | Syntax | Example |
|--------|--------|---------|
| Connect | `mongoose.connect(uri)` | `await mongoose.connect("mongodb://127.0.0.1:27017/mydb")` |
| Define schema | `new mongoose.Schema({...})` | `const s = new mongoose.Schema({name: String})` |
| Create model | `mongoose.model(name, schema)` | `mongoose.model("Book", bookSchema)` |
| Find all | `Model.find()` | `await Book.find()` |
| Find with filter | `Model.find(query)` | `await Student.find({ WAD_Marks: { $gt: 20 } })` |
| Find with projection | `Model.find(query, fields)` | `await Student.find({}, { Name: 1, _id: 0 })` |
| Create (single) | `Model.create(data)` | `await Employee.create({ name: "Rahul" })` |
| Create (instance) | `new Model(data); await doc.save()` | `const b = new Book({...}); await b.save()` |
| Create (bulk) | `Model.insertMany([...])` | `await Student.insertMany([{...}, {...}])` |
| Update one | `Model.updateOne(filter, update)` | `await Song.updateOne({ Songname: "X" }, { $set: { Actor: "Y" } })` |
| Delete one | `Model.deleteOne(filter)` | `await Book.deleteOne({ title: "Harry Potter" })` |
| Count | `Model.countDocuments()` | `await Song.countDocuments()` |

### MongoDB Query Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `$gt` | Greater than | `{ marks: { $gt: 25 } }` |
| `$lt` | Less than | `{ marks: { $lt: 40 } }` |
| `$gte` | Greater than or equal | `{ salary: { $gte: 50000 } }` |
| `$lte` | Less than or equal | `{ price: { $lte: 1000 } }` |
| `$set` | Set field value | `{ $set: { Actor: "Ranbir" } }` |
| `$inc` | Increment field | `{ $inc: { marks: 10 } }` |

---

**Note:** None of the practicals in this workspace use WebSocket (socket.io / ws). All communication is request-response via HTTP + AJAX. The w11 project uses in-memory storage (`const users = []`), while w18-w21 use Mongoose/MongoDB for persistence.
