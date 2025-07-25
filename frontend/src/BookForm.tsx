import React, { useState } from "react";

const BookForm = ({ onBookAdded }: { onBookAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:4000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, rating, description }),
    });

    onBookAdded();

    setTitle("");
    setAuthor("");
    setRating("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
      <input value={rating} onChange={e => setRating(e.target.value)} placeholder="Rating" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
