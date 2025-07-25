import React from "react";
import styles from "./Book.module.scss";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  rating: string;
  description: string;
  imageUrl?: string;
  onRemove: () => void;
  onEdit: () => void;
}

const renderStars = (rating: string) => {
  const stars = Math.floor(Number(rating));
  const half = Number(rating) % 1 >= 0.5; // Check if there's a half-star

  return (
    <>
      {"★".repeat(stars)}
      {half && "½"}
      {"☆".repeat(5 - stars - (half ? 1 : 0))}
    </>
  );
};

const Book: React.FC<BookProps> = ({
  title,
  author,
  rating,
  description,
  onRemove,
  imageUrl,
  onEdit,
}) => {
  return (
    <div className={styles.card}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${title} cover`}
          className={styles.bookImage}
        />
      )}
      <h2 className={styles.title}>{title}</h2>
      <h4 className={styles.author}>
        {author} {rating && <>- {renderStars(rating)}</>}
      </h4>
      <p className={styles.description}>{description}</p>
      {/* <button onClick={onEdit} className={styles.buttonEdit}>Edit</button> */}

      <button className={styles.button} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
};

export default Book;
