import './ImageGallery.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul className="ImageGallery">
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
