import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
export default function ImageGallery({ items, onImageClick }) {
  return (
    <ul className={css.container}>
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => onImageClick(item)}
          className={css.imageGalleryItem}
        >
          <ImageCard name={item} />
        </li>
      ))}
    </ul>
  );
}
