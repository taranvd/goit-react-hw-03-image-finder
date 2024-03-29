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

  async componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query, page, totalImg, images } = this.state;

    const isDifferentQueryOrPage = prevQuery !== query || prevPage !== page;

    // const isEmptyQuery = query === '';

    // if (isEmptyQuery) {
    //   warn('Please enter something 👀');
    //   return;
    // }

    if (isDifferentQueryOrPage) {
      this.setState({ isLoading: true });

      try {
        const normalizeQuery = query.slice(8, query.length);
        const { hits, totalHits } = await fetchImages(normalizeQuery, page);

        const isNoImagesFound = totalHits === 0;
        const haveMoreImages =
          images.length + hits.length === totalHits && totalImg > 0;

        if (isNoImagesFound) {
          warn('Image not found. Try something else 😐');
          return;
        }

        if (totalHits !== 0 && totalImg === 0) {
          success(
            <span>
              Found <b>{totalHits} </b>pictures 🌆
            </span>
          );
        }

        this.setState(prevState => ({
          images:
            prevState.images.length === 0
              ? hits
              : [...prevState.images, ...hits],
          totalImg: totalHits,
        }));

        if (haveMoreImages) {
          info('No more photos!');
        }
      } catch (warn) {
        console.warn(warn);
        error('Oops! something went wrong. Please try again later. ❌');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleQueryFormSubmit = newQuery => {
    if (newQuery.trim() === '') {
      warn('Please enter something 👀');
    } else {
      this.setState({
        query: `${nanoid(7)}/${newQuery}`,
        images: [],
        page: 1,
        totalImg: 0,
      });
    }
  };

  handleLoadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, totalImg, isLoading } = this.state;
    const shouldShowButton =
      !isLoading && images.length > 0 && images.length < totalImg;
    return (
      <AppWrapp>
        <Searchbar onSubmit={this.handleQueryFormSubmit} />
        <ImageGallery images={images} />

        {isLoading && <Loader />}

        {shouldShowButton && <Button loadMore={this.handleLoadMoreButton} />}

        <ToastContainer />
        <GlobalStyled />
      </AppWrapp>
    );
  }
}
