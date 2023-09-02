import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const { ImageGallery: ImageGalleryList } = styles;

export const ImageGallery = ({ images }) => {
  return (
    <ul className={ImageGalleryList}>
      {images.map(({ webformatURL, tags, largeImageURL }, index) => (
        <li key={index} className="ImageGalleryItem ">
          <ImageGalleryItem
            image={webformatURL}
            alt={tags}
            largeImage={largeImageURL}
          />
        </li>
      ))}
    </ul>
  );
};
