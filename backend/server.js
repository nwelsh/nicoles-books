const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const DB_FILE = "books.json";

// Read all books
app.get("/books", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  res.json(data);
});

// Add a new book
app.post("/books", (req, res) => {
  const newBook = req.body;
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  data.push(newBook);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.status(201).json(newBook);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
