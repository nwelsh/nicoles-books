import React from "react";
import styles from "./Book.module.scss";
import { ReactComponent as PinIcon } from "./icons/pin.svg";
import { ReactComponent as TrashIcon } from "./icons/trash.svg";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  rating: string;
  description: string;
  imageUrl?: string;
  isPinned: boolean;
  onRemove?: () => void;
  onEdit?: () => void;
  onTogglePin?: () => void;
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
  isPinned,
  onTogglePin,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.icons}>
        <PinIcon
          onClick={onTogglePin}
          className={isPinned ? styles.pinned : styles.unpinned}
        ></PinIcon>
        <TrashIcon className={styles.button} onClick={onRemove}></TrashIcon>
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${title} cover`}
          className={styles.bookImage}
        />
      )}
      <h2 className={styles.title}>{title}</h2>
      <h4 className={styles.author}>{author}</h4>
      {rating && <p className={styles.stars}>{renderStars(rating)}</p>}
      {description && <p className={styles.description}>{description}</p>}
      {/* <button onClick={onEdit} className={styles.buttonEdit}>Edit</button> */}
    </div>
  );
};

export default Book;
