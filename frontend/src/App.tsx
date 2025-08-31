import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import Book from "./Book";
import styles from "./App.module.scss";

interface BookData {
  id: string;
  title: string;
  author: string;
  rating: string;
  imageUrl: string;
  isPinned: boolean;
}

const App = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [editingBook, setEditingBook] = useState<BookData | null>(null);
  const [ratingFilter, setRatingFilter] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true); // 🔹 NEW state

  const pinnedBooks = books.filter((book) => book.isPinned);
  const filteredBooks = books.filter((book) => {
    if (ratingFilter === "All") return true;
    return Math.floor(Number(book.rating)) === Number(ratingFilter);
  });

  const fetchBooks = async () => {
    try {
      setLoading(true); // show loading before fetching
      const res = await fetch("https://books-backend-qqn9.onrender.com/books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false); // hide loading when done
    }
  };

  const removeBook = async (id: string) => {
    const response = await fetch(`https://books-backend-qqn9.onrender.com/books/${id}`, {
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

    await fetch(`https://books-backend-qqn9.onrender.com/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    fetchBooks();
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.mainTitle}>Nicole's 2025 books</h1>

      {loading ? ( 
        <div className={styles.loadingScreen}>
          <div className={styles.spinner}></div>
          <p>Loading book data...</p>
          <p>This takes a second on start up.</p>
        </div>
      ) : (
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
            <h2 className={styles["top-title"]}>Current top 3: Summer, Swimming, Water</h2>
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
            <h2 className={styles.allBooks}>All 2025 books:</h2>
            <label className={styles.filter}>
              Filter by Rating:
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className={styles.selector}
              >
                <option value="All">All</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </label>

            <div className={styles["books-container"]}>
              {filteredBooks.map((book) => (
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
      )}
    </div>
  );
};

export default App;
