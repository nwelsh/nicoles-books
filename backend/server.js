const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database file
const DB_FILE = path.join(__dirname, "books.json");

// Ensure books.json exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, "[]"); // start with empty array
}

// Root route (handy for Render health check)
app.get("/", (req, res) => {
  res.send("Backend is running! Try /books");
});

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

// Delete book by ID
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  let data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  const index = data.findIndex((book) => book.id === id);

  if (index !== -1) {
    const removed = data.splice(index, 1);
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.status(200).json({ message: "Book removed", removed });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Update book by ID
app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const updatedBook = req.body;

  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  const index = data.findIndex((book) => book.id === id);

  if (index !== -1) {
    data[index] = { ...data[index], ...updatedBook, id }; // keep same ID
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.json(data[index]);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
