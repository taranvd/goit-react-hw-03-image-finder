import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppWrapp, GlobalStyled } from './GlobalStyle';
import { error, warn, info, success } from 'services/toasts';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'services/api';
import { ToastContainer } from 'react-toastify';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalImg: 0,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { page, query, totalImg, images } = this.state;
    const normalizeQuery = query.slice(8, query.length);

    if (query === '') {
      warn('Please enter something 👀');
      return;
    }

    if (prevQuery !== query || prevPage !== page) {
      this.setState({ isLoading: true });

      setTimeout(async () => {
        try {
          const { hits, totalHits } = await fetchImages(normalizeQuery, page);

          if (totalHits !== 0 && totalImg === 0) {
            success(`Find ${totalHits} images`);
          }

          this.setState(prevState => ({
            images:
              prevState.images.length === 0
                ? hits
                : [...prevState.images, ...hits],
            totalImg: totalHits,
          }));

          if (images.length + hits.length === totalHits && totalImg > 0) {
            info('No more photos!');
          } else if (totalHits === 0) {
            warn('Image not found. Try something else 😐');
          }
        } catch (warn) {
          console.warn(warn);
          error('Oops! something went wrong. Please try again later. ❌');
        } finally {
          this.setState({ isLoading: false });
        }
      });
    }
  }

  handleQueryFormSubmit = newQuery =>
    this.setState({
      query: `${nanoid(7)}/${newQuery}`,
      images: [],
      page: 1,
      totalImg: 0,
    });

  handleLoadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, totalImg, isLoading } = this.state;
    return (
      <AppWrapp>
        <Searchbar onSubmit={this.handleQueryFormSubmit} />
        <ImageGallery images={images} />

        {isLoading && <Loader />}

        {isLoading ||
        images.length === 0 ||
        images.length === totalImg ? null : (
          <Button loadMore={this.handleLoadMoreButton} />
        )}

        <ToastContainer />
        <GlobalStyled />
      </AppWrapp>
    );
  }
}
