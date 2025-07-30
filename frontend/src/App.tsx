import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import Book from "./Book";
import styles from "./App.module.scss";
import FiveStarBooks from "./FiveStarBooks";

interface BookData {
  id: string;
  title: string;
  author: string;
  rating: string;
  description: string;
  imageUrl: string;
  isPinned: boolean;
}

const App = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [editingBook, setEditingBook] = useState<BookData | null>(null);
  const pinnedBooks = books.filter((book) => book.isPinned);
  const unpinnedBooks = books.filter((book) => !book.isPinned);

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

  const togglePin = async (id: string) => {
    const book = books.find((b) => b.id === id);
    const pinnedCount = books.filter((b) => b.isPinned).length;

    if (!book) return;

    if (!book.isPinned && pinnedCount >= 3) {
      alert("You can only pin up to 3 books.");
      return;
    }

    const updatedBook = { ...book, isPinned: !book.isPinned };

    await fetch(`http://localhost:4000/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    fetchBooks();
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.mainTitle}>Nicole's 2025 books</h1>
      <div className={styles.container}>
        <div className={styles.sideBar}>
          <div className={styles.stats}>
            <p className={styles.statsTotal}>
              Total books in 2025: {books.length}
            </p>
            <p className={styles.statsGoal}>2025 Goal: 150</p>
            <div className={styles.progressWrapper}>
              <div
                className={styles.progressBar}
                style={{ width: `${(books.length / 150) * 100}%` }}
              />
            </div>
          </div>
          <div className={styles.bookContainer}>
            <h1 className={styles.title}>Add a new book</h1>
            <BookForm
              onBookAdded={() => {
                fetchBooks();
                setEditingBook(null);
              }}
              initialData={editingBook}
              onCancelEdit={() => setEditingBook(null)}
            />
          </div>
        </div>
        <div className={styles.mainSection}>
          <h2 className={styles["top-title"]}>2025 top 3:</h2>
          <div className={styles.pinnedSection}>
            {pinnedBooks.map((book) => (
              <Book
                key={book.id}
                {...book}
                onRemove={() => removeBook(book.id)}
                onEdit={() => setEditingBook(book)}
                onTogglePin={() => togglePin(book.id)}
              />
            ))}
          </div>

          {/* <FiveStarBooks books={books} onRemove={removeBook}  /> */}
          <h2>All 2025 books:</h2>
          <div className={styles["books-container"]}>
            {books.map((book) => (
              <Book
                key={book.id}
                {...book}
                onRemove={() => removeBook(book.id)}
                onEdit={() => setEditingBook(book)}
                onTogglePin={() => togglePin(book.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
