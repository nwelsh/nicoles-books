import React, { useEffect, useState } from "react";
import styles from "./Book.module.scss";
import { ReactComponent as PinIcon } from "./icons/pin.svg";
import { ReactComponent as TrashIcon } from "./icons/trash.svg";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  rating: string;
  imageUrl?: string;
  isPinned: boolean;
  onRemove?: () => void;
  onEdit?: () => void;
  onTogglePin?: () => void;
}

const getRandomColor = () => {
  const pastelColors = [
    "#FFCDD2",
    "#F8BBD0",
    "#E1BEE7",
    "#D1C4E9",
    "#C5CAE9",
    "#BBDEFB",
    "#B2EBF2",
    "#C8E6C9",
    "#FFF9C4",
    "#FFE0B2",
    "#FFCCBC",
  ];
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
};

const renderStars = (rating: string) => {
  const stars = Math.floor(Number(rating));
  const half = Number(rating) % 1 >= 0.5; 

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
  onRemove,
  imageUrl,
  onEdit,
  isPinned,
  onTogglePin,
}) => {
  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    setBgColor(getRandomColor());
  }, []);
  return (
    <div className={styles.card} style={{ backgroundColor: bgColor }}> 
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
    </div>
  );
};

export default Book;
