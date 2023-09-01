import { Component } from 'react';
import './ImageGalleryItem.css';
import { ModalBox } from 'components/Modal/Modal';

// export const ImageGalleryItem = ({ image, alt }) => {
//   return <img src={image} alt={alt} className="ImageGalleryItem-image" />;
// };

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const { image, alt, largeImage } = this.props;
    return (
      <>
        <img
          onClick={this.openModal}
          src={image}
          alt={alt}
          className="ImageGalleryItem-image"
        />
        <ModalBox
          state={isModalOpen}
          onClose={this.closeModal}
          largeImage={largeImage}
          alt={alt}
        />
      </>
    );
  }
}
