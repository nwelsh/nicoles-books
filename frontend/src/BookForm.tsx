import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./BookForm.module.scss";

interface BookData {
  id?: string;
  title: string;
  author: string;
  rating: string;
  description: string;
  imageUrl: string;
}

interface BookFormProps {
  onBookAdded: () => void;
  initialData?: BookData | null;
  onCancelEdit?: () => void;
}

const BookForm: React.FC<BookFormProps> = ({
  onBookAdded,
  initialData = null,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [rating, setRating] = useState(initialData?.rating || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const isEditMode = !!initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericRating = Math.min(5, Math.max(0, parseFloat(rating) || 0));

    const bookData = {
      title,
      author,
      rating: numericRating.toString(),
      description,
      imageUrl,
    };

    if (isEditMode && initialData) {
      await fetch(`http://localhost:4000/books/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
    } else {
      await fetch("http://localhost:4000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bookData, id: uuidv4() }),
      });
    }

    onBookAdded();
    if (onCancelEdit) onCancelEdit();

    setTitle("");
    setAuthor("");
    setRating("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
        className={styles.input}
      />
      <input
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        className={styles.input}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <input
        type="number"
        className={styles.input}
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating (0-5)"
        min="0"
        max="5"
        step="0.5"
        required
      />
      <textarea
        className={styles.input}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button className={styles.button}>Add Book</button>
      {/* {initialData && <button type="button" onClick={onCancelEdit}>Cancel</button>} */}
    </form>
  );
};

export default BookForm;
