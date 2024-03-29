import { Component } from 'react';
import { ModalBox } from 'components/Modal/Modal';
import styles from './ImageGalleryItem.module.css';

const { ImageGalleryItem_image } = styles;

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
          className={ImageGalleryItem_image}
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
