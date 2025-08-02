import React from "react";
import Book, { BookProps } from "./Book";

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
      <h2>5 Star Books</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          border: "1px solid red",
        }}
      >
        {fiveStarBooks.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default FiveStarBooks;
