import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import Book from "./Book";
import styles from "./App.module.scss";

// TODO
// deploy
// mobile version
// favorites section
// edit cards capability\

interface BookData {
  id: string;
  title: string;
  author: string;
  rating: string;
  description: string;
  imageUrl: string;
}

const App = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [editingBook, setEditingBook] = useState<BookData | null>(null);

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

    fetchBooks(); 
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>My Book List</h1>
  
      <BookForm
        onBookAdded={() => {
          fetchBooks();
          setEditingBook(null);
        }}
        initialData={editingBook}
        onCancelEdit={() => setEditingBook(null)}
      />
  
      {books.map((book) => (
        <Book
          key={book.id}
          {...book}
          onRemove={() => removeBook(book.id)}
          onEdit={() => setEditingBook(book)}
        />
      ))}
    </div>
  );
  
};

export default App;
