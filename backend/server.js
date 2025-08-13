const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const DB_FILE = path.join(__dirname, "books.json");

app.use(cors());
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Read all books
app.get("/books", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Could not read books" });
  }
});

// Add a new book
app.post("/books", (req, res) => {
  try {
    const newBook = req.body;
    const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    data.push(newBook);
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Could not save book" });
  }
});

// Delete book by ID
app.delete("/books/:id", (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: "Could not delete book" });
  }
});

// Update book
app.put("/books/:id", (req, res) => {
  try {
    const id = req.params.id;
    const updatedBook = req.body;

    let data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    const index = data.findIndex(book => book.id === id);

    if (index !== -1) {
      data[index] = { ...data[index], ...updatedBook, id };
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      res.status(200).json(data[index]);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not update book" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
