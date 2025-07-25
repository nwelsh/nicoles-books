import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const BookForm = ({ onBookAdded }: { onBookAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook = {
      id: uuidv4(), // generate unique ID
      title,
      author,
      rating,
      description,
    };

    await fetch("http://localhost:4000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    onBookAdded();

    setTitle("");
    setAuthor("");
    setRating("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <input
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
