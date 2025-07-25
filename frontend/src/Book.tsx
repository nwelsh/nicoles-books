import React from "react";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  rating: string;
  description: string;
  onRemove: () => void;
}

const Book: React.FC<BookProps> = ({
  title,
  author,
  rating,
  description,
  onRemove,
}) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <h4 style={styles.author}>
        {author} {rating && <>- {rating}/5</>}
      </h4>
      <p style={styles.description}>{description}</p>
      <button onClick={onRemove} style={styles.button}>
        Remove
      </button>
    </div>
  );
};
const styles: {
  card: React.CSSProperties;
  title: React.CSSProperties;
  author: React.CSSProperties;
  description: React.CSSProperties;
  button: React.CSSProperties;
} = {
  card: {
    border: "1px solid #ccc",
    padding: "1rem",
    margin: "1rem 0",
    borderRadius: "8px",
    background: "#f9f9f9",
    position: "relative",
  },
  title: {
    margin: 0,
    fontSize: "1.25rem",
  },
  author: {
    margin: "0.5rem 0",
    color: "#555",
  },
  description: {
    color: "#333",
  },
  button: {
    backgroundColor: "#ff4d4d",
    border: "none",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
};

export default Book;
