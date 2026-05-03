const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(express.static("public"));

app.get("/products", (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        const products = JSON.parse(data);
        res.json(products);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
