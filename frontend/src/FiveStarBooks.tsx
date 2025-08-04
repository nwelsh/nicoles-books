import React from "react";
import Book, { BookProps } from "./Book";
import styles from "./FiveStarBooks.module.scss";

interface FiveStarBooksProps {
  books: BookProps[];
  onRemove?: (id: string) => void;
  onEdit?: (book: BookProps) => void;
}

const FiveStarBooks: React.FC<FiveStarBooksProps> = ({
  books,
  onRemove,
  onEdit,
}) => {
  const fiveStarBooks = books.filter((book) => Number(book.rating) === 5);

  if (fiveStarBooks.length === 0) {
    return <p>No 5-star books yet.</p>;
  }

  return (
    <div>
      <div
        className={styles.main}
      >
        {fiveStarBooks.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default FiveStarBooks;
