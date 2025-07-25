import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import Book from "./Book";

interface BookData {
  id: string;
  title: string;
  author: string;
  rating: string;
  description: string;
}

const App = () => {
  const [books, setBooks] = useState<BookData[]>([]);

  const fetchBooks = async () => {
    const res = await fetch("http://localhost:4000/books");
    const data = await res.json();
    setBooks(data);
  };
  const removeBook = async (id: string) => {
    const response = await fetch(`http://localhost:4000/books/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Delete failed:", await response.text());
    }

    fetchBooks(); // refresh
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>My Book List</h1>
      <BookForm onBookAdded={fetchBooks} />
      {books.map((book) => (
        <Book key={book.id} {...book} onRemove={() => removeBook(book.id)} />
      ))}
    </div>
  );
};

export default App;
