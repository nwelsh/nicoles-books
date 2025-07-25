import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";

interface Book {
  title: string;
  author: string;
  rating: string;
  description: string;
}

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const res = await fetch("http://localhost:4000/books");
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>My Book List</h1>
      <BookForm onBookAdded={fetchBooks} />
      <div>
        {books.map((book, index) => (
          <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h2>{book.title}</h2>
            <h4>{book.author} - {book.rating}/5</h4>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
